import sqlite3
def create_tables():
    connection = sqlite3.connect("visualization_database.db")
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
            competitorA REAL DEFAULT 0.0,
            competitorB REAL DEFAULT 0.0,           
            country TEXT NOT NULL,
            year INTEGER CHECK (year >= 2016 AND year < 2026),
            PRIMARY KEY (ourCompany,competitorA,competitorB,country,year)
        ) STRICT;
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS shareValue (
            shareValueOpen REAL DEFAULT 0.0,
            shareValueClose REAL DEFAULT 0.0,
            shareValueHigh REAL DEFAULT 0.0,
            shareValueLow REAL DEFAULT 0.0,                     
            month INTEGER CHECK (month >= 0 AND month <= 11),
            year INTEGER CHECK (year >= 2016 AND year < 2026),       
            PRIMARY KEY (month, year)
        ) STRICT;
    """)

    connection.commit()
    connection.close()