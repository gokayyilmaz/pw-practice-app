import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
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
  await dropDownMenu.click()

  // Select options and check theme is applied
  const header = page.locator("nb-layout-header")
  const colors = {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
    "Cosmic": "rgb(50, 50, 89)",
    "Corporate": "rgb(255, 255, 255)"
  }
  for (const [color, colorValue] of Object.entries(colors)) {
    await dropDownMenu.click()
    await optionList.filter({ hasText: color }).click()
    await expect(header).toHaveCSS("background-color", colorValue)
  }

})

test("tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click()
  await page.getByText("Tooltip").click()

  const toolTipCard = page.locator("nb-card", { hasText: "Tooltip Placements" })
  await toolTipCard.getByRole("button", { name: "Top" }).hover()

  await expect(page.locator("nb-tooltip")).toHaveText("This is a tooltip")

})

test("dialog boxes", async ({ page }) => {
  await page.getByText("Tables & Data").click()
  await page.getByText("Smart Table").click()

  page.on("dialog", dialog => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?")
    dialog.accept()
  })

  const firstRow = page.locator("table tbody tr").first()
  await firstRow.locator(".nb-trash").click()
  await expect(firstRow).not.toHaveText("mdo@gmail.com")
})

test("tables", async ({ page }) => {
  await page.getByText("Tables & Data").click()
  await page.getByText("Smart Table").click()

  // get the row by any unique text in this row
  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" })
  await targetRow.locator(".nb-edit").click()
  await page.locator("input-editor").getByPlaceholder("Age").fill("35")
  await page.locator(".nb-checkmark").click()

  // get the row based on the value in the specific column
  await page.getByRole("link", { name: "2" }).click()
  const targetRowById = page.getByRole("row", { name: "11" }).filter({ has: page.locator("td").nth(1).getByText("11") })
  await targetRowById.locator(".nb-edit").click()
  await page.locator("input-editor").getByPlaceholder("E-mail").fill("test@test.com")
  await page.locator(".nb-checkmark").click()
  await expect(targetRowById.locator("td").nth(5)).toHaveText("test@test.com")

  // test filter of the table
  const ages = ["20", "30", "40", "200"]

  for (const age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").fill(age)
    await page.waitForTimeout(500)
    const ageRows = page.locator("table tbody tr")

    for (const ageRow of await ageRows.all()) {
      const ageCell = ageRow.locator("td").last()
      if (age == "200") {
        await expect(page.locator("tbody tr td")).toHaveText("No data found")
      } else {
        await expect(ageCell).toHaveText(age)
      }
    }
  }

})

test("datepicker", async ({ page }) => {
  await page.getByText("Forms").click()
  await page.getByText("Datepicker").click()

  const calendarInputField = page.getByPlaceholder("Form Picker")
  await calendarInputField.click()

  let date = new Date()
  date.setDate(date.getDate() + 14)
  const expectedDate = date.getDate().toString()
  const expectedMonthShort = date.toLocaleString("En-US", { month: "short" })
  const expectedMonthLong = date.toLocaleString("En-US", { month: "long" })
  const expectedYear = date.getFullYear()
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

  let calendarMonthAndYear = await page.locator("nb-calendar-view-mode").textContent()
  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

  while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
    await (page.locator("nb-calendar-pageable-navigation [data-name='chevron-right']")).click()
    calendarMonthAndYear = await page.locator("nb-calendar-view-mode").textContent()
  }

  await page.locator("[class='day-cell ng-star-inserted']").getByText(expectedDate, { exact: true }).click()
  await expect(calendarInputField).toHaveValue(dateToAssert)
})

test("sliders", async ({ page }) => {

  const tempBox = page.locator("nb-tab[tabtitle='Temperature'] ngx-temperature-dragger")

  // update attribute
  const tempGauge = page.locator("nb-tab[tabtitle='Temperature'] ngx-temperature-dragger circle")
  await tempGauge.evaluate(node => {
    node.setAttribute("cx", "229.528")
    node.setAttribute("cy", "229.528")
  })
  await tempGauge.click()
  await expect(tempBox).toContainText("30")

  // mouse movement
  await tempBox.scrollIntoViewIfNeeded()
  const box = await tempBox.boundingBox()

  if (!box) {
    throw new Error("Temperature dragger bounding box could not be found")
  }

  const x = box.x + box?.width / 2
  const y = box.y + box?.height / 2
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(x + 100, y)
  await page.mouse.move(x + 100, y + 100)
  await page.mouse.up()
  await expect(tempBox).toContainText("30")

})