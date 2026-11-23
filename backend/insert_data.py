import sqlite3
from generate_data import sales_data, market_share_data, share_value_data


with sqlite3.connect("visualization_database.db") as connection:
    cursor = connection.cursor()
    
    cursor.executemany("""
        INSERT INTO sales (salesNum, product, country, year)
        VALUES (?, ?, ?, ?);
    """, sales_data)

    cursor.executemany("""
        INSERT INTO marketShare (marketShareNum, company, country, year)
        VALUES (?, ?, ?, ?);
    """, market_share_data)

    cursor.executemany("""
        INSERT INTO shareValue (shareValueOpen, shareValueClose, shareValueHigh, shareValueLow, month, year)
        VALUES (?, ?, ?, ?, ?, ?);
    """, share_value_data)
