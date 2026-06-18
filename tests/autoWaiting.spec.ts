import { test, expect} from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click()
})

test("Auto waiting", async({page}) => {
  const successButton = page.locator(".bg-success")

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000})
})