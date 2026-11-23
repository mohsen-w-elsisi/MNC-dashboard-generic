import sqlite3
connection = sqlite3.connect("visualization_database.db")
cursor = connection.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS sales (
        salesNum INTEGER DEFAULT 0, 
        product TEXT NOT NULL,
        country TEXT NOT NULL,                 
        year INTEGER CHECK (year >= 2016 AND year < 2026),
        PRIMARY KEY(product,country,year)
    );
""")

cursor.execute("""
    CREATE TABLE IF NOT EXISTS marketShare (
        marketShareNum REAL DEFAULT 0.0,
        company TEXT NOT NULL,       
        country TEXT NOT NULL,
        year INTEGER CHECK (year >= 2016 AND year < 2026),
        PRIMARY KEY (company,country,year)
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
