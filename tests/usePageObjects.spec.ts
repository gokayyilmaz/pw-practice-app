import { test, expect } from "@playwright/test"
import { NavigationPage } from "../page-objects/navigationPage"
import { FormLayoutsPage } from "../page-objects/formLayoutsPage"
import { DatePickerPage } from "../page-objects/datePickerPage"
import { faker } from "@faker-js/faker"

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
  const datePickerPage = new DatePickerPage(page)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(/\s+/g, "")}${faker.number.int(1000)}@test.com`

  await navigationPage.formLayoutsPage()
  await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption("test@test.com", "Welcome1", "Option 2")
  await page.screenshot({path: "screenshots/formsLayoursPage.png"})
  await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
  await page.locator("nb-card", { hasText: "Inline form" }).screenshot({path: "screenshots/inlineForm.png"})
  await navigationPage.datepickerPage()
  await datePickerPage.selectCommonDatePickerDateFromToday(7)
  await datePickerPage.selectDatepickerWithRangeFromToday(7, 14)
})

