"""Scrape trainer and talent spells for all original WoW Classic classes.

Install dependencies with: python -m pip install requests beautifulsoup4
Run with: python setup.py
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
DEFAULT_SITE_CATALOG = ROOT_DIR / "wow-skills-catalog.js"
DEFAULT_DATABASE = ROOT_DIR / "wow_skills.db"
DEFAULT_ICONS_DIR = ROOT_DIR / "public" / "icons"
CLASS_PAGES = (
    ("MAGE", 8, "mage"),
    ("PRIEST", 5, "priest"),
    ("PALADIN", 2, "paladin"),
    ("WARRIOR", 1, "warrior"),
    ("ROGUE", 4, "rogue"),
    ("WARLOCK", 9, "warlock"),
    ("DRUID", 11, "druid"),
    ("SHAMAN", 7, "shaman"),
    ("HUNTER", 3, "hunter"),
)
CLASS_DATABASE_ASSIGNMENT = re.compile(
    r"^\s*window\.classSkillsDatabase\s*=\s*(\{.*\})\s*;?\s*$",
    re.DOTALL,
)
SPELL_METADATA = re.compile(r"_\[\s*(\d+)\s*\]\s*=\s*\{([^}]*)\}")
ICON_FIELD = re.compile(r"\bicon\s*:\s*['\"]([^'\"]+)['\"]")
NAME_FIELD = re.compile(r"\bname_enus\s*:\s*['\"]([^'\"]+)['\"]")
CLASS_SPELL_LIST = re.compile(
    r"new Listview\(\{.*?data:\s*\[(.*?)\]\s*\}\);",
    re.DOTALL,
)
SPELL_ROW = re.compile(r"\{[^{}]*\}")
SPELL_NAME_FIELD = re.compile(r'"name":"((?:\\.|[^"\\])*)"')
SPELL_ID_FIELD = re.compile(r'"id":(\d+)')
SPELL_ICON_MAP_ENTRY = re.compile(
    r'"(\d+)":\{"name_enus":"(?:\\.|[^"\\])*?","icon":"([^"]+)"'
)
RANK_SUFFIX = re.compile(
    r"\s*(?:\(\s*)?rank\s+\d+\s*\)?\s*$",
    re.IGNORECASE,
)


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
    """Read the curated spell IDs in the configured class order."""
    entries = []
    for class_name, _, _ in CLASS_PAGES:
        if class_filter and class_name != class_filter:
            continue
        skills = database.get(class_name, [])
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

    if class_filter and class_filter not in {name for name, _, _ in CLASS_PAGES}:
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


def normalize_skill_name(name: str) -> str:
    """Remove a trailing rank label so ranks count as one ability."""
    return RANK_SUFFIX.sub("", name).strip()


def resolve_class_filter(value: str | None) -> str | None:
    """Resolve a class token or slug to the configured class name."""
    if value is None:
        return None
    for class_name, _, class_slug in CLASS_PAGES:
        if value.casefold() in {class_name.casefold(), class_slug.casefold()}:
            return class_name
    valid_classes = ", ".join(
        f"{class_name} ({class_slug})" for class_name, _, class_slug in CLASS_PAGES
    )
    raise ValueError(f"Unknown class: {value}. Choose from: {valid_classes}")


def parse_class_spells(
    html: str, class_name: str, class_id: int
) -> list[dict[str, Any]]:
    """Parse active class spells from a Wowhead Classic class page."""
    match = CLASS_SPELL_LIST.search(html)
    if not match:
        raise ValueError(f"Wowhead spell list was not found for {class_name}")

    icon_by_id = {
        int(spell_id): icon_name
        for spell_id, icon_name in SPELL_ICON_MAP_ENTRY.findall(html)
    }
    class_mask = 1 << (class_id - 1)
    skills_by_name: dict[str, dict[str, Any]] = {}
    for row in SPELL_ROW.findall(match.group(1)):
        name_match = SPELL_NAME_FIELD.search(row)
        spell_id_match = SPELL_ID_FIELD.search(row)
        category_match = re.search(r'"cat":(-?\d+)', row)
        class_match = re.search(r'"reqclass":(\d+)', row) or re.search(
            r'"chrclass":(\d+)', row
        )
        if not name_match or not spell_id_match or not category_match or not class_match:
            continue
        if int(category_match.group(1)) != 7:
            continue
        if int(class_match.group(1)) & class_mask == 0:
            continue
        if re.search(r'"seasonId":\d+', row):
            continue

        spell_id = int(spell_id_match.group(1))
        icon_name = icon_by_id.get(spell_id)
        if not icon_name:
            continue
        name = normalize_skill_name(
            json.loads(f'"{name_match.group(1)}"')
        )
        if not name:
            continue
        skills_by_name.setdefault(
            name.casefold(),
            {
                "name": name,
                "class": class_name,
                "spell_id": spell_id,
                "icon": icon_name,
            },
        )

    return list(skills_by_name.values())


def fetch_class_spells(
    session: requests.Session,
    class_name: str,
    class_id: int,
    class_slug: str,
    timeout: float,
) -> list[dict[str, Any]]:
    """Fetch one Wowhead Classic class page and parse its spell catalog."""
    response = session.get(
        f"https://www.wowhead.com/classic/class={class_id}/{class_slug}",
        timeout=timeout,
    )
    response.raise_for_status()
    return parse_class_spells(response.text, class_name, class_id)


def get_cached_icons(path: Path) -> dict[tuple[str, int], str]:
    """Read known spell icons from a previous scraper output, when present."""
    if not path.is_file():
        return {}
    try:
        cached_skills = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        print(f"Warning: Could not read cached spell icons from {path}: {error}", file=sys.stderr)
        return {}
    return {
        (skill["class"].upper(), skill["spell_id"]): skill["icon"]
        for skill in cached_skills
        if isinstance(skill, dict)
        and isinstance(skill.get("class"), str)
        and isinstance(skill.get("spell_id"), int)
        and isinstance(skill.get("icon"), str)
    }


def load_existing_results(path: Path) -> list[dict[str, Any]]:
    """Load a previous full export before refreshing only one class."""
    if not path.is_file():
        return []
    try:
        skills = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        raise ValueError(f"Could not read existing results from {path}: {error}") from error
    if not isinstance(skills, list) or any(not isinstance(skill, dict) for skill in skills):
        raise ValueError(f"Expected a list of skill records in {path}")
    return skills


def merge_skill_results(
    existing: list[dict[str, Any]],
    refreshed: list[dict[str, Any]],
    class_filter: str | None,
) -> list[dict[str, Any]]:
    """Replace refreshed classes while retaining every other class."""
    if not class_filter:
        return refreshed
    merged = [
        skill
        for skill in existing
        if str(skill.get("class", "")).casefold() != class_filter.casefold()
    ]
    merged.extend(refreshed)
    return merged


def scrape_skills(
    entries: list[dict[str, Any]],
    class_filter: str | None = None,
    cached_icons: dict[tuple[str, int], str] | None = None,
    timeout: float = 15,
    delay: float = 0.25,
) -> list[dict[str, Any]]:
    """Scrape all nine class pages and retain existing curated spells."""
    results = []
    cached_icons = cached_icons or {}
    with requests.Session() as session:
        session.headers.update(
            {"User-Agent": "EasyMacrosWoW skill metadata scraper/1.0"}
        )
        selected_classes = [
            class_info
            for class_info in CLASS_PAGES
            if not class_filter or class_info[0].casefold() == class_filter.casefold()
        ]
        if class_filter and not selected_classes:
            valid_classes = ", ".join(class_name for class_name, _, _ in CLASS_PAGES)
            raise ValueError(f"Unknown class: {class_filter}. Choose from: {valid_classes}")

        entries_by_class: dict[str, list[dict[str, Any]]] = {}
        for entry in entries:
            entries_by_class.setdefault(entry["class"].upper(), []).append(entry)

        for index, (class_name, class_id, class_slug) in enumerate(selected_classes):
            if index and delay > 0:
                time.sleep(delay)
            class_skills = fetch_class_spells(
                session, class_name, class_id, class_slug, timeout
            )
            if not class_skills:
                raise ValueError(
                    f"No eligible spells were found for {class_name}; "
                    "refusing to write an incomplete class list"
                )
            seen_names = {skill["name"].casefold() for skill in class_skills}

            for entry in entries_by_class.get(class_name, []):
                name = normalize_skill_name(entry["name"])
                key = name.casefold()
                if not name or key in seen_names:
                    continue
                icon_name = cached_icons.get(
                    (class_name, entry["spell_id"])
                )
                if not icon_name:
                    try:
                        icon_name = fetch_spell(session, entry["spell_id"], timeout)["icon"]
                    except (ValueError, requests.RequestException) as error:
                        print(
                            f"Warning: Skipping {class_name} spell "
                            f"{entry['spell_id']} ({name}): {error}",
                            file=sys.stderr,
                        )
                        continue
                class_skills.append(
                    {
                        "name": name,
                        "class": class_name,
                        "spell_id": entry["spell_id"],
                        "icon": icon_name,
                    }
                )
                seen_names.add(key)

            results.extend(class_skills)
            print(f"{class_name}: {len(class_skills)} unique skills")
    return results


def write_results(path: Path, skills: list[dict[str, Any]]) -> None:
    """Write scraped spell metadata as UTF-8 JSON."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(skills, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def write_site_catalog(path: Path, skills: list[dict[str, Any]]) -> None:
    """Write the browser-ready catalog used to augment skills-data.js."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        "window.wowSkillCatalog = "
        + json.dumps(skills, ensure_ascii=False, indent=2)
        + ";\n",
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
        description=(
            "Extract trainer and talent spells for original WoW Classic classes "
            "from Wowhead Classic."
        )
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
        "--site-catalog",
        type=Path,
        default=DEFAULT_SITE_CATALOG,
        help="Browser catalog path (default: repository wow-skills-catalog.js)",
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
        help="Only scrape one class, e.g. MAGE or mage",
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
        help="Pause between class page requests in seconds (default: 0.25)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        class_filter = resolve_class_filter(args.class_filter)
        database = load_class_database(args.input)
        entries = get_spell_entries(database, class_filter)
        skills = scrape_skills(
            entries,
            class_filter=class_filter,
            cached_icons=get_cached_icons(args.output),
            timeout=args.timeout,
            delay=args.delay,
        )
        if class_filter:
            skills = merge_skill_results(
                load_existing_results(args.output), skills, class_filter
            )
        write_results(args.output, skills)
        write_site_catalog(args.site_catalog, skills)
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
