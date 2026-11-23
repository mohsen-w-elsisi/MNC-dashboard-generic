import itertools
import random

countries = [
    "Egypt", "USA", "Germany", "Japan", "Brazil",
    "UK", "France", "India", "Canada", "South Korea",
    "Australia", "UAE", "Saudi Arabia", "Spain", "Italy"
]
years = list(range(2016, 2026))  # 10 years: 2016 to 2025 inclusive
products = ["Laptop", "Phone", "Tablet"]
companies = ["Apple", "Samsung", "Lenovo"]
months = list(range(12))

sales_data = [
    (random.randint(100, 5000), product, country, year)
    for product, country, year in itertools.product(products, countries, years)
]

market_share_data = [
    (round(random.uniform(5.0, 45.0), 2), country, company, year)
    for company, country, year in itertools.product(companies, countries, years)
]

share_value_data = []
for year, month in itertools.product(years, months):
    open_val = round(random.uniform(100.0, 200.0), 2)
    close_val = round(random.uniform(100.0, 200.0), 2)
    high_val = round(max(open_val, close_val) + random.uniform(1.0, 15.0), 2)
    low_val = round(min(open_val, close_val) - random.uniform(1.0, 15.0), 2)
    share_value_data.append((open_val, close_val, high_val, low_val, month, year))