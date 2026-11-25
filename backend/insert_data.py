import sqlite3
from pathlib import Path
from database import create_tables
from generate_data import sales_data, market_share_data, share_value_data, strategic_objectives_data

db_path = DB_PATH = Path(__file__).parent / "visualization_database.db"
create_tables()
with sqlite3.connect(db_path) as connection:
    cursor = connection.cursor()
    
    cursor.executemany("""
        INSERT OR REPLACE INTO sales (productA, productB, productC, country, year)
        VALUES (?, ?, ?, ?, ?);
    """, sales_data)

    cursor.executemany("""
        INSERT OR REPLACE INTO marketShare (ourCompany, competitor1, competitor2, others, country, year)
        VALUES (?, ?, ?, ?, ?, ?);
    """, market_share_data)

    cursor.executemany("""
        INSERT OR REPLACE INTO shareValue (open, close, high, low, month, year)
        VALUES (?, ?, ?, ?, ?, ?);
    """, share_value_data)

    cursor.executemany("""
        INSERT OR REPLACE INTO StrategicObjectives (objective, bad, satisfactory, excellent, goal, current)
        VALUES (?, ?, ?, ?, ?, ?);
    """, strategic_objectives_data)
