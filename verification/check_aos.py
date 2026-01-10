from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")
        page.wait_for_timeout(1000)

        # Check for AOS classes on the hero div
        hero = page.locator("#home .max-w-4xl")
        classes = hero.get_attribute("class")
        print(f"Hero classes: {classes}")

        # Also check if data-aos attribute exists
        aos_attr = hero.get_attribute("data-aos")
        print(f"Hero data-aos: {aos_attr}")

        browser.close()

if __name__ == "__main__":
    run()
