import { test, expect} from "@playwright/test"

test.beforeEach(async ({ page }) => {
  const url = process.env.URL_UITESTINGPLAYGROUND;

  if (!url) {
    throw new Error("URL_UITESTINGPLAYGROUND is not defined");
  }

  await page.goto(url);
  await page.getByText("Button Triggering AJAX Request").click()
})

test("Auto waiting", async({page}) => {
  const successButton = page.locator(".bg-success")

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000})
})
