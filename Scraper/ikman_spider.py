import requests
from bs4 import BeautifulSoup
import time
import random
import pandas as pd
import os

# To appear as a normal browser
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

all_cars_data = []

# You can change the number of pages to scrape here (currently set to 10)
pages_to_scrape = 10

print("🚀 Full data collection operation started...\n")

# 1. Pagination Loop (going page by page)
for page in range(1, pages_to_scrape + 1):
    page_url = f"https://riyasewana.com/search/cars?page={page}"
    print(f"--- 📄 Scraping page {page} ---")

    response = requests.get(page_url, headers=headers)
    if response.status_code != 200:
        print(f"Cannot access page {page}. (Status: {response.status_code})")
        continue

    soup = BeautifulSoup(response.text, 'html.parser')
    car_links = []

    # Collect car links from the main page
    ul_tag = soup.find('ul', class_='v-list')
    if ul_tag:
        title_divs = ul_tag.find_all('div', class_='v-card-title')
        for div in title_divs:
            a_tag = div.find('a')
            if a_tag and 'href' in a_tag.attrs:
                link = a_tag['href']
                if not link.startswith('http'): link = "https:" + link
                car_links.append(link)

    print(f"  > Found {len(car_links)} links. Extracting car details...\n")

    # 2. Go inside each car page (Inner Page Scraping)
    for i, link in enumerate(car_links):
        try:
            inner_res = requests.get(link, headers=headers, timeout=10)
            inner_res.raise_for_status()
            inner_soup = BeautifulSoup(inner_res.text, 'html.parser')

            car_data = {'URL': link}

            # -----------------------------------------------------
            # [FIXED] Extract price from the new HTML structure
            price_tag = inner_soup.find('div', class_='price-amount')
            car_data['Price'] = price_tag.text.strip() if price_tag else "N/A"
            # -----------------------------------------------------

            # Extract remaining data from 'detail-row' (Year, Mileage, Make, Model, etc.)
            detail_rows = inner_soup.find_all('div', class_='detail-row')

            for row in detail_rows:
                label_tag = row.find('span', class_='detail-label')
                value_tag = row.find('span', class_='detail-value')

                if label_tag and value_tag:
                    key = label_tag.text.strip()
                    value = value_tag.text.strip()
                    car_data[key] = value

            all_cars_data.append(car_data)

            # Print success along with the price
            price_print = car_data.get('Price', 'N/A')
            print(f"    [+] Extracted: {car_data.get('Make', 'Unknown')} {car_data.get('Model', '')} | Price: {price_print}")

            # Mandatory delay (to avoid IP blocking)
            time.sleep(random.uniform(1, 2.5))

        except Exception as e:
            print(f"    [-] An error occurred: {link}")

    print(f"--- Page {page} complete! ---\n")

# 3. Save data as a CSV file
if all_cars_data:
    df = pd.DataFrame(all_cars_data)
    os.makedirs('../data', exist_ok=True) # Create folder if it doesn't exist

    # Save as a new CSV file
    save_path = '../data/riyasewana_raw_final.csv'
    df.to_csv(save_path, index=False)

    print("\n✅ Operation completed successfully!")
    print(f"Total number of cars: {len(df)}")
    print(f"Data saved to '{save_path}'.")
else:
    print("Failed to collect any data.") 