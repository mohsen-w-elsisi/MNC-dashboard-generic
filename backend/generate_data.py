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
    comp_b = round(random.uniform(5.0, 100.0 - our_company - comp_a), 2)
    market_share_data.append((our_company, comp_a, comp_b, country, year))

share_value_data = []
for year, month in itertools.product(years, months):
    open_val = round(random.uniform(100.0, 200.0), 2)
    close_val = round(random.uniform(100.0, 200.0), 2)
    high_val = round(max(open_val, close_val) + random.uniform(1.0, 15.0), 2)
    low_val = round(min(open_val, close_val) - random.uniform(1.0, 15.0), 2)
    share_value_data.append((open_val, close_val, high_val, low_val, month, year))