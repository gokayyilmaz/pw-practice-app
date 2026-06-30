import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Forms").click()
  await page.getByText("Form Layouts").click()
})

test("locating child elements", async ({ page }) => {
  await page.locator("nb-card nb-radio").filter({ hasText: "Option 1" }).click()
  await page.locator("nb-card").getByRole("button", { name: "SIGN IN" }).first().click()
})

test("locating parent elements", async ({ page }) => {
  await page.locator("nb-card").filter({ has: page.locator("nb-checkbox") }).filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Email" }).click()

  await page.locator("nb-card-header", { hasText: "Using the Grid" }).locator("..").getByRole("textbox", { name: "Email" }).click()
})

test("Reusing the locators", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" })
  const emailField = basicForm.getByRole("textbox", { name: "Email" })
  await emailField.fill("test@test.com")
  await basicForm.getByRole("textbox", { name: "Password" }).fill("Welcome123")
  await basicForm.locator("nb-checkbox").click()
  await basicForm.getByRole("button").click()

  await expect(emailField).toHaveValue("test@test.com")
})

test("extracting values", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" })
  const buttonText = await basicForm.locator("button").textContent()
  expect(buttonText).toEqual("Submit")

  const allRadioButtonsLabels = await page.locator("nb-radio").allTextContents()
  expect(allRadioButtonsLabels).toContain("Option 1")

  const emailField = basicForm.getByRole("textbox", { name: "email" })
  await emailField.fill("test@test.com")
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual("test@test.com")

  const placeholderValue = await emailField.getAttribute("placeholder")
  expect(placeholderValue).toEqual("Email")
})

test("assertions", async ({ page }) => {
  const basicFormButton = page.locator("nb-card").filter({ hasText: "Basic form" }).locator("button")

  // General assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual("Submit")

  // Locator assertions
  await expect(basicFormButton).toHaveText("Submit")

  // Soft assertions
  await expect.soft(basicFormButton).toHaveText("Submit")
  await basicFormButton.click()

})

