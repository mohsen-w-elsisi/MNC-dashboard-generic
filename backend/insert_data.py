import sqlite3
from database import create_tables
from generate_data import sales_data, market_share_data, share_value_data

create_tables()

with sqlite3.connect("visualization_database.db") as connection:
    cursor = connection.cursor()
    
    cursor.executemany("""
        INSERT OR REPLACE INTO sales (productA, productB, productC, country, year)
        VALUES (?, ?, ?, ?, ?);
    """, sales_data)

    cursor.executemany("""
        INSERT OR REPLACE INTO marketShare (ourCompany, competitorA, competitorB, country, year)
        VALUES (?, ?, ?, ?, ?);
    """, market_share_data)

    cursor.executemany("""
        INSERT OR REPLACE INTO shareValue (shareValueOpen, shareValueClose, shareValueHigh, shareValueLow, month, year)
        VALUES (?, ?, ?, ?, ?, ?);
    """, share_value_data)
