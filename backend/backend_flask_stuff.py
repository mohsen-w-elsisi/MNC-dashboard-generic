import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/api/sales")
def getSales():
    connection = sqlite3.connect("visualization_database.db")
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    product = request.args.get("product")
    country = request.args.get("country")
    year = request.args.get("year")
    query = "SELECT * FROM sales WHERE 1=1"
    params = []

    if product:
        query += " AND product = ?"
        params.append(product)
    if country:
        query += " AND country = ?"
        params.append(country)
    if year:
        query += " AND year = ?"
        params.append(year)

    cursor.execute(query,params)
    results_not_dict = cursor.fetchall()
    results_dict = [dict(row) for row in results_not_dict]
    connection.close()
    
    return jsonify(results_dict)

@app.route("/api/market-share")
def getMarketShare():
    connection = sqlite3.connect("visualization_database.db")
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    company = request.args.get("company")
    country = request.args.get("country")
    year = request.args.get("year")
    query = "SELECT * FROM marketShare WHERE 1=1"
    params = []

    if company:
        query += " AND company = ?"
        params.append(company)
    if country:
        query += " AND country = ?"
        params.append(country)
    if year:
        query += " AND year = ?"
        params.append(year)
    
    cursor.execute(query,params)
    results_not_dict = cursor.fetchall()
    results_dict = [dict(row) for row in results_not_dict]
    connection.close()
    
    return jsonify(results_dict)

@app.route("/api/share-value")
def getShareValue():
    connection = sqlite3.connect("visualization_database.db")
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

    cursor.execute(query,params)
    results_not_dict = cursor.fetchall()
    results_dict = [dict(row) for row in results_not_dict]
    connection.close()
    
    return jsonify(results_dict)

if __name__ == "__main__":
    app.run(debug=True)