import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/")
})

test.describe("Form layout page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
  })

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page.locator("nb-card", { hasText: "Using the Grid" }).getByRole("textbox", { name: "Email" })
    await usingTheGridEmailInput.fill("test@test.com")

    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual("test@test.com")

    await expect(usingTheGridEmailInput).toHaveValue("test@test.com")

  })

  test("radio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", { hasText: "Using the Grid" })
    const option1RadioButton = usingTheGridForm.getByRole("radio", { name: "Option 1" })
    await option1RadioButton.check({ force: true })
    await expect(option1RadioButton).toBeChecked()

    const option2RadioButton = usingTheGridForm.getByRole("radio", { name: "Option 2" })
    await expect(option2RadioButton).not.toBeChecked()
  })

})

test.describe("Modal & overlays page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Modal & Overlays").click()
    await page.getByText("Toastr").click()
  })

  test("checkboxes", async ({ page }) => {
    // await page.getByRole("checkbox", {name: "Hide on click"}).uncheck({force: true})
    // await page.getByRole("checkbox", {name: "Prevent arising of duplicate toast"}).check({force: true})
    const allBoxes = page.getByRole("checkbox")
    for (const box of await allBoxes.all()) {
      await box.uncheck({ force: true })
      await expect(box).not.toBeChecked()
    }

  })
})

test("lists and dropdowns", async ({ page }) => {
  // Check drowDownMenu option list
  const dropDownMenu = page.locator("ngx-header nb-select")
  await dropDownMenu.click()
  const optionList = page.getByRole("list").locator("nb-option")
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

  // Select options and check theme is applied
  await dropDownMenu.click()
  const header = page.locator("nb-layout-header")
  const colors = {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
    "Cosmic": "rgb(50, 50, 89)",
    "Corporate": "rgb(255, 255, 255)"
  }
  for (const color in colors) {
    await dropDownMenu.click()
    await optionList.filter({ hasText: color }).click()
    await expect(header).toHaveCSS("background-color", colors[color])
  }

})