import itertools
import random

countries = [
    "Egypt", "USA", "Germany", "Japan", "Brazil",
    "UK", "France", "India", "Canada", "South Korea",
    "Australia", "UAE", "Saudi Arabia", "Spain", "Italy"
]
years = list(range(2016, 2026))  # 10 years: 2016 to 2025 inclusive
months = list(range(12))

sales_data = [
    (
        random.randint(100, 5000),  # productA
        random.randint(100, 5000),  # productB
        random.randint(100, 5000),  # productC
        country,
        year
    )
    for year, country in itertools.product(years, countries)
]

market_share_data = []
for year, country in itertools.product(years, countries):
    our_company = round(random.uniform(15.0, 45.0), 2)
    comp_a = round(random.uniform(10.0, 35.0), 2)
    comp_b = round(random.uniform(5.0, 95.0 - our_company - comp_a), 2)
    others = round(100.0 - our_company - comp_a - comp_b, 2)
    market_share_data.append((our_company, comp_a, comp_b, others, country, year))

share_value_data = []
for year, month in itertools.product(years, months):
    open_val = round(random.uniform(100.0, 200.0), 2)
    close_val = round(random.uniform(100.0, 200.0), 2)
    high_val = round(max(open_val, close_val) + random.uniform(1.0, 15.0), 2)
    low_val = round(min(open_val, close_val) - random.uniform(1.0, 15.0), 2)
    share_value_data.append((open_val, close_val, high_val, low_val, month, year))

latest_close = share_value_data[-1][1]
share_2025 = [row[0] for row in market_share_data if row[5] == 2025]
avg_global_market_share = round(sum(share_2025) / len(share_2025), 2)

sales_2025 = [row[0] + row[1] + row[2] for row in sales_data if row[4] == 2025]
total_revenue_2025 = float(sum(sales_2025))

strategic_objectives_data = [
    ("sharePrice", 120.0, 150.0, 180.0, 200.0, latest_close),
    ("globalMarketShare", 20.0, 28.0, 36.0, 42.0, avg_global_market_share),
    ("revenue", 75000.0, 105000.0, 130000.0, 145000.0, total_revenue_2025),
]