"""Scrape Classic WoW spell names and icons for the project's skill database.

Install dependencies with: python -m pip install requests beautifulsoup4
Run with: python scrape_wow_skills.py --class WARLOCK
"""

import argparse
import json
import re
import sqlite3
import sys
import time
from contextlib import closing
from pathlib import Path
from typing import Any

import requests
from bs4 import BeautifulSoup


ROOT_DIR = Path(__file__).resolve().parent
DEFAULT_INPUT = ROOT_DIR / "skills-data.js"
DEFAULT_OUTPUT = ROOT_DIR / "wow-skills.json"
DEFAULT_DATABASE = ROOT_DIR / "wow_skills.db"
DEFAULT_ICONS_DIR = ROOT_DIR / "public" / "icons"
CLASS_DATABASE_ASSIGNMENT = re.compile(
    r"^\s*window\.classSkillsDatabase\s*=\s*(\{.*\})\s*;?\s*$",
    re.DOTALL,
)
SPELL_METADATA = re.compile(r"_\[\s*(\d+)\s*\]\s*=\s*\{([^}]*)\}")
ICON_FIELD = re.compile(r"\bicon\s*:\s*['\"]([^'\"]+)['\"]")
NAME_FIELD = re.compile(r"\bname_enus\s*:\s*['\"]([^'\"]+)['\"]")


def load_class_database(path: Path) -> dict[str, list[dict[str, Any]]]:
    """Load the class-to-spells mapping from skills-data.js."""
    source = path.read_text(encoding="utf-8-sig")
    match = CLASS_DATABASE_ASSIGNMENT.match(source)
    if not match:
        raise ValueError(f"Could not find classSkillsDatabase assignment in {path}")

    database = json.loads(match.group(1))
    if not isinstance(database, dict):
        raise ValueError(f"Expected a class mapping in {path}")
    return database


def get_spell_entries(
    database: dict[str, list[dict[str, Any]]], class_filter: str | None = None
) -> list[dict[str, Any]]:
    """Flatten the class database into unique class/spell ID pairs."""
    entries = []
    for class_name, skills in database.items():
        if class_filter and class_name.casefold() != class_filter.casefold():
            continue
        if not isinstance(skills, list):
            continue

        seen_ids = set()
        for skill in skills:
            spell_id = skill.get("spellId")
            if skill.get("kind") != "spell" or not isinstance(spell_id, int):
                continue
            if spell_id in seen_ids:
                continue
            seen_ids.add(spell_id)
            entries.append(
                {
                    "class": class_name,
                    "spell_id": spell_id,
                    "name": skill.get("en", ""),
                }
            )

    if class_filter and not any(
        name.casefold() == class_filter.casefold() for name in database
    ):
        raise ValueError(f"Unknown class: {class_filter}")
    return entries


def parse_spell_page(html: str, spell_id: int) -> dict[str, str]:
    """Extract the English name and icon filename from a ClassicDB spell page."""
    soup = BeautifulSoup(html, "html.parser")
    metadata = None
    for script in soup.find_all("script"):
        script_text = script.string or script.get_text()
        for match in SPELL_METADATA.finditer(script_text):
            if int(match.group(1)) == spell_id:
                metadata = match.group(2)
                break
        if metadata:
            break

    if not metadata:
        raise ValueError(f"Spell metadata for ID {spell_id} was not found")

    icon_match = ICON_FIELD.search(metadata)
    if not icon_match:
        raise ValueError(f"Icon filename for spell ID {spell_id} was not found")

    name_match = NAME_FIELD.search(metadata)
    name = name_match.group(1) if name_match else ""
    if not name and soup.title:
        name = soup.title.get_text(" ", strip=True).split(" - Spell - ", 1)[0]
    if not name:
        raise ValueError(f"Spell name for ID {spell_id} was not found")

    return {"name": name, "icon": icon_match.group(1)}


def fetch_spell(
    session: requests.Session, spell_id: int, timeout: float
) -> dict[str, str]:
    """Request and parse one ClassicDB spell page."""
    response = session.get(
        "https://classicdb.ch/",
        params={"spell": spell_id},
        timeout=timeout,
    )
    response.raise_for_status()
    return parse_spell_page(response.text, spell_id)


def scrape_skills(
    entries: list[dict[str, Any]],
    timeout: float = 15,
    delay: float = 0.25,
) -> list[dict[str, Any]]:
    """Fetch spell metadata while reusing results for duplicate spell IDs."""
    results = []
    spell_cache: dict[int, dict[str, str]] = {}
    with requests.Session() as session:
        session.headers.update(
            {"User-Agent": "EasyMacrosWoW skill metadata scraper/1.0"}
        )
        for index, entry in enumerate(entries):
            spell_id = entry["spell_id"]
            if spell_id not in spell_cache:
                if spell_cache and delay > 0:
                    time.sleep(delay)
                try:
                    spell_cache[spell_id] = fetch_spell(session, spell_id, timeout)
                except ValueError as error:
                    print(
                        f"Warning: Skipping spell ID {spell_id} "
                        f"({entry['name']}): {error}",
                        file=sys.stderr,
                    )
                    continue

            results.append(
                {
                    "name": spell_cache[spell_id]["name"],
                    "class": entry["class"],
                    "spell_id": spell_id,
                    "icon": spell_cache[spell_id]["icon"],
                }
            )
            print(
                f"[{index + 1}/{len(entries)}] "
                f"{entry['class']}: {spell_cache[spell_id]['name']}",
                file=sys.stderr,
            )
    return results


def write_results(path: Path, skills: list[dict[str, Any]]) -> None:
    """Write scraped spell metadata as UTF-8 JSON."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(skills, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def save_results_to_database(path: Path, skills: list[dict[str, Any]]) -> None:
    """Create the skills table and replace records for scraped classes."""
    path.parent.mkdir(parents=True, exist_ok=True)
    class_names = sorted({skill["class"] for skill in skills})
    with closing(sqlite3.connect(path)) as connection:
        with connection:
            connection.execute(
                """
                CREATE TABLE IF NOT EXISTS skills (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    class_name TEXT NOT NULL,
                    icon_name TEXT NOT NULL
                )
                """
            )
            connection.executemany(
                "DELETE FROM skills WHERE class_name = ?",
                [(class_name,) for class_name in class_names],
            )
            connection.executemany(
                """
                INSERT INTO skills (name, class_name, icon_name)
                VALUES (?, ?, ?)
                """,
                [
                    (skill["name"], skill["class"], skill["icon"])
                    for skill in skills
                ],
            )


def download_icons(
    database_path: Path = DEFAULT_DATABASE,
    output_dir: Path = DEFAULT_ICONS_DIR,
    timeout: float = 15,
) -> tuple[int, list[str]]:
    """Download each unique icon_name in the SQLite database as a JPG file."""
    with closing(sqlite3.connect(database_path)) as connection:
        icon_names = [
            row[0]
            for row in connection.execute(
                "SELECT DISTINCT icon_name FROM skills ORDER BY icon_name"
            )
        ]

    output_dir.mkdir(parents=True, exist_ok=True)
    downloaded = 0
    failures = []
    with requests.Session() as session:
        session.headers.update(
            {"User-Agent": "EasyMacrosWoW skill icon downloader/1.0"}
        )
        for icon_name in icon_names:
            if not icon_name or not re.fullmatch(r"[A-Za-z0-9_]+", icon_name):
                message = f"Invalid icon filename in database: {icon_name!r}"
                print(f"Warning: {message}", file=sys.stderr)
                failures.append(message)
                continue

            destination = output_dir / f"{icon_name.lower()}.jpg"
            if destination.is_file():
                continue

            try:
                response = session.get(
                    "https://wow.zamimg.com/images/wow/icons/large/"
                    f"{icon_name.lower()}.jpg",
                    timeout=timeout,
                )
                response.raise_for_status()
            except requests.HTTPError as error:
                status_code = (
                    error.response.status_code
                    if error.response is not None
                    else None
                )
                if status_code == 404:
                    message = f"Icon not found (HTTP 404): {icon_name}"
                else:
                    message = f"Could not download {icon_name}: {error}"
                print(f"Warning: {message}", file=sys.stderr)
                failures.append(message)
                continue
            except requests.RequestException as error:
                message = f"Could not download {icon_name}: {error}"
                print(f"Warning: {message}", file=sys.stderr)
                failures.append(message)
                continue

            destination.write_bytes(response.content)
            downloaded += 1

    return downloaded, failures


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extract WoW spell names and icon filenames from ClassicDB."
    )
    parser.add_argument(
        "--input",
        type=Path,
        default=DEFAULT_INPUT,
        help="Path to skills-data.js (default: repository skills-data.js)",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=DEFAULT_OUTPUT,
        help="Output JSON path (default: repository wow-skills.json)",
    )
    parser.add_argument(
        "--database",
        type=Path,
        default=DEFAULT_DATABASE,
        help="SQLite database path (default: repository wow_skills.db)",
    )
    parser.add_argument(
        "--icons-dir",
        type=Path,
        default=DEFAULT_ICONS_DIR,
        help="Directory for downloaded icons (default: repository public/icons)",
    )
    parser.add_argument(
        "--class",
        dest="class_filter",
        help="Only scrape one class, for example WARLOCK",
    )
    parser.add_argument(
        "--timeout",
        type=float,
        default=15,
        help="HTTP timeout in seconds (default: 15)",
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=0.25,
        help="Pause between spell requests in seconds (default: 0.25)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        database = load_class_database(args.input)
        entries = get_spell_entries(database, args.class_filter)
        if not entries:
            raise ValueError("No spell entries found for the selected class")
        skills = scrape_skills(entries, args.timeout, args.delay)
        write_results(args.output, skills)
        save_results_to_database(args.database, skills)
        downloaded, icon_failures = download_icons(
            args.database, args.icons_dir, args.timeout
        )
    except (
        OSError,
        ValueError,
        json.JSONDecodeError,
        requests.RequestException,
        sqlite3.Error,
    ) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1

    print(
        f"Saved {len(skills)} spells to {args.output} and {args.database}; "
        f"downloaded {downloaded} icons to {args.icons_dir}; "
        f"{len(icon_failures)} icon download(s) failed."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
