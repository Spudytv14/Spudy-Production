import os
from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Load the local HTML file
        # We need the absolute path
        cwd = os.getcwd()
        file_path = f"file://{cwd}/index.html"

        print(f"Navigating to {file_path}")
        page.goto(file_path)

        # Wait for the page to load and fonts to render
        page.wait_for_timeout(2000)

        # Screenshot Hero Section
        print(" taking screenshot of Hero section...")
        page.screenshot(path="verification/hero_section.png")

        # Scroll to Books
        print(" scrolling to Books section...")
        page.locator("#spudy-books").scroll_into_view_if_needed()
        page.wait_for_timeout(1000) # Wait for potential animations
        page.screenshot(path="verification/books_section.png")

        # Scroll to Courses
        print(" scrolling to Courses section...")
        page.locator("#spudy-courses").scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/courses_section.png")

        # Scroll to Pricing
        print(" scrolling to Pricing section...")
        page.locator("#pricing").scroll_into_view_if_needed()
        page.wait_for_timeout(1000)
        page.screenshot(path="verification/pricing_section.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
