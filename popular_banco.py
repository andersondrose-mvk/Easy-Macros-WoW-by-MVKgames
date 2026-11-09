"""Synchronize wow-skills.json into the primary SQLite database."""

import json

from scrape_wow_skills import DEFAULT_DATABASE, DEFAULT_OUTPUT, save_results_to_database


def criar_e_popular_banco() -> None:
    """Load the current skills export into wow_skills.db."""
    with DEFAULT_OUTPUT.open(encoding="utf-8") as skills_file:
        skills = json.load(skills_file)
    if not isinstance(skills, list) or any(not isinstance(skill, dict) for skill in skills):
        raise ValueError(f"Expected a list of skill records in {DEFAULT_OUTPUT}")

    save_results_to_database(DEFAULT_DATABASE, skills)
    print(
        f"Banco de dados '{DEFAULT_DATABASE.name}' atualizado com sucesso! "
        f"Total de habilidades: {len(skills)}"
    )


if __name__ == "__main__":
    criar_e_popular_banco()
