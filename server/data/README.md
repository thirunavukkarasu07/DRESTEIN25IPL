Data templates for players and teams

Files:
- players_template.csv — CSV template you can fill and then import.
- players_template.json — JSON array template for bulk import.
- teams_template.csv — CSV template for teams (members as semicolon-separated list).
- teams_template.json — JSON array template for teams.

Import notes:
- CSV: ensure headers match the first line. For members use a semicolon-separated string (e.g. "A;B;C").
- JSON: supply arrays for members.
- Passwords in templates are plain text; if you implement an import endpoint, hash the password before saving.

Quick seed example (node script):
1. Read `players_template.json` and create Player documents.
2. Read `teams_template.json`, hash passwords with bcrypt, and create Team documents.

I left the actual data blank—please fill these templates with your players and teams.
