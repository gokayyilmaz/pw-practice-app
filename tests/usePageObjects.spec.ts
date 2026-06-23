import { test, expect } from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { FormLayoutsPage } from "../page-objects/formLayoutsPage"

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/")
})

test("navigate to form page", async ({ page }) => {
  const navigationPage = new NavigationPage(page)
  await navigationPage.formLayoutsPage()
  await navigationPage.datepickerPage()
  await navigationPage.smartTablePage()
  await navigationPage.toastrPage()
  await navigationPage.tooltipPage()
})

test("parameterized methods", async ({ page }) => {
  const navigationPage = new NavigationPage(page)
  const formLayoutsPage = new FormLayoutsPage(page)

  await navigationPage.formLayoutsPage()
  await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption("test@test.com", "Welcome1", "Option 2")
  await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox("John Smith", "john@test.com", false)
})