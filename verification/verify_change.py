from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 1280, "height": 720})
        cwd = os.getcwd()
        page.goto(f"file://{cwd}/index.html")

        # Scroll to bottom
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

        # Wait longer for animation
        page.wait_for_timeout(5000)

        page.screenshot(path="verification/verification_numbers_v2.png")
        browser.close()

if __name__ == "__main__":
    run()
