import sqlite3
connection = sqlite3.connect("visualization_database.db")
cursor = connection.cursor()

cursor.execute("SELECT COUNT(*) FROM sales;")
print("Total sales rows:", cursor.fetchone()[0])

cursor.execute("SELECT * FROM marketShare LIMIT 5;")
for row in cursor.fetchall():
    print(row)