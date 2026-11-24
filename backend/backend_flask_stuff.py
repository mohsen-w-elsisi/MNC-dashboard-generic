import sqlite3
from pathlib import Path
from flask import Flask, request, jsonify
from datetime import datetime, timezone

db_path = Path(__file__).parent / "visualization_database.db"
app = Flask(__name__)

@app.after_request
def add_cors_headers(request):
    request.headers["Access-Control-Allow-Origin"] = "*"
    return request

@app.route("/api/sales")
def getSales():
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    productA = request.args.get("productA")
    productB = request.args.get("productB")
    productC = request.args.get("productC")
    country = request.args.get("country")
    year = request.args.get("year")
    query = "SELECT * FROM sales WHERE 1=1"
    params = []

    if productA:
        query += " AND productA = ?"
        params.append(productA)
    if productB:
        query += " AND productB = ?"
        params.append(productB)
    if productC:
        query += " AND productC = ?"
        params.append(productC)
    if country:
        query += " AND country = ?"
        params.append(country)
    if year:
        query += " AND year = ?"
        params.append(year)
    
    query += " ORDER BY year ASC"
    cursor.execute(query,params)
    results_not_dict = cursor.fetchall()
    results_dict = []
    for row in results_not_dict:
        row = dict(row)
        date = datetime(year=row['year'], month=1, day=1, tzinfo=timezone.utc)
        actualTime = int(date.timestamp() * 1000)
        row['actualTime'] = actualTime
        results_dict.append(row)
    connection.close()
    
    return jsonify(results_dict)

@app.route("/api/market-share")
def getMarketShare():
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    ourCompany = request.args.get("ourCompany")
    competitorA = request.args.get("competitorA")
    competitorB = request.args.get("competitorB")
    others = request.args.get("others")
    country = request.args.get("country")
    year = request.args.get("year")
    query = "SELECT * FROM marketShare WHERE 1=1"
    params = []

    if ourCompany:
        query += " AND ourCompany = ?"
        params.append(ourCompany)
    if competitorA:
        query += " AND competitorA = ?"
        params.append(competitorA)
    if competitorB:
        query += " AND competitorB = ?"
        params.append(competitorB)
    if others:
        query += " AND others = ?"
        params.append(others)
    if country:
        query += " AND country = ?"
        params.append(country)
    if year:
        query += " AND year = ?"
        params.append(year)
    
    query += " ORDER BY year ASC"
    cursor.execute(query,params)
    results_not_dict = cursor.fetchall()
    results_dict = []
    for row in results_not_dict:
        row = dict(row)
        date = datetime(year=row['year'], month=1, day=1, tzinfo=timezone.utc)
        actualTime = int(date.timestamp() * 1000)
        row['actualTime'] = actualTime
        results_dict.append(row)
    connection.close()
    
    return jsonify(results_dict)

@app.route("/api/share-value")
def getShareValue():
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    month = request.args.get("month")
    year = request.args.get("year")
    query = "SELECT * FROM shareValue WHERE 1=1"
    params= []

    if month:
        query += " AND month = ?"
        params.append(month)
    if year:
        query += " AND year = ?"
        params.append(year)

    query += " ORDER BY year ASC, month ASC"
    cursor.execute(query,params)
    results_not_dict = cursor.fetchall()
    results_dict = []
    for row in results_not_dict:
        row = dict(row)
        date = datetime(year=row['year'], month=row['month'] + 1, day=1, tzinfo=timezone.utc)
        actualTime = int(date.timestamp() * 1000)
        row['actualTime'] = actualTime
        results_dict.append(row)
    connection.close()
    
    return jsonify(results_dict)

if __name__ == "__main__":
    app.run(debug=True)