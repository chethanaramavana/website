"""Complete only the local Miniflare database schema, without replacing records.

Start the dev server once before running this. Never connects to remote D1.
"""
import re
import sqlite3
from pathlib import Path

root = Path(__file__).resolve().parents[1]
state = root / '.wrangler/state/v3/d1'
targets = []
for database in state.rglob('*.sqlite'):
    with sqlite3.connect(database) as connection:
        if connection.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='submissions'").fetchone():
            targets.append(database)
if len(targets) != 1:
    raise SystemExit('Expected exactly one local learning database. Start the preview server first.')
database = targets[0].resolve()
assert database.is_relative_to(state.resolve())
with sqlite3.connect(database) as connection:
    for migration in sorted((root / 'drizzle').glob('*.sql')):
        sql = migration.read_text()
        sql = re.sub(r'CREATE TABLE\s+', 'CREATE TABLE IF NOT EXISTS ', sql)
        sql = re.sub(r'CREATE (UNIQUE )?INDEX\s+', lambda m:f'CREATE {m[1] or ""}INDEX IF NOT EXISTS ', sql)
        for statement in sql.split('--> statement-breakpoint'):
            alter = re.search(r'ALTER TABLE `([^`]+)` ADD `([^`]+)`', statement)
            if alter and alter[2] in {row[1] for row in connection.execute(f'PRAGMA table_info("{alter[1]}")')}:
                continue
            connection.executescript(statement)
print('Local preview schema is ready. Existing records preserved; no remote database touched.')
