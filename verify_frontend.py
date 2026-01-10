from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")
        page.screenshot(path="screenshot_before.png", full_page=True)
        browser.close()

if __name__ == "__main__":
    run()
