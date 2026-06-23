import { test, expect } from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"

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