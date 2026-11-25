import sqlite3
from pathlib import Path

db_path = DB_PATH = Path(__file__).parent / "visualization_database.db"
def create_tables():
    connection = sqlite3.connect(db_path)
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS sales (
            productA INTEGER DEFAULT 0,
            productB INTEGER DEFAULT 0,
            productC INTEGER DEFAULT 0,           
            country TEXT NOT NULL,                 
            year INTEGER CHECK (year >= 2016 AND year < 2026),
            PRIMARY KEY(productA,productB,productC,country,year)
        );
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS marketShare (
            ourCompany REAL DEFAULT 0.0,
            competitor1 REAL DEFAULT 0.0,
            competitor2 REAL DEFAULT 0.0,
            others REAL DEFAULT 0.0,           
            country TEXT NOT NULL,
            year INTEGER CHECK (year >= 2016 AND year < 2026),
            PRIMARY KEY (ourCompany,competitor1,competitor2,others,country,year)
        ) STRICT;
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS shareValue (
            open REAL DEFAULT 0.0,
            close REAL DEFAULT 0.0,
            high REAL DEFAULT 0.0,
            low REAL DEFAULT 0.0,                     
            month INTEGER CHECK (month >= 0 AND month <= 11),
            year INTEGER CHECK (year >= 2016 AND year < 2026),       
            PRIMARY KEY (month, year)
        ) STRICT;
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS StrategicObjectives (
            objective TEXT PRIMARY KEY NOT NULL,
            bad REAL DEFAULT 0.0,
            satisfactory REAL DEFAULT 0.0,
            excellent REAL DEFAULT 0.0,
            goal REAL DEFAULT 0.0,
            current REAL DEFAULT 0.0                        
        )
    """)

    connection.commit()
    connection.close()