import { test, expect } from "@playwright/test"

test("drag and drop with iframe", async ({ page }) => {
  const url = process.env.URL_GLOBALSQA

  if(!url) {
    throw new Error("URL_GLOBALSQA is not defined")
  }

  await page.goto(url)
  const frame = page.frameLocator("[rel-title='Photo Manager'] iframe")

  // with dragTo()
  await frame.getByText("High Tatras 2").dragTo(frame.locator("#trash"))

  // with mouse control
  await frame.getByText("High Tatras 4").hover()
  await page.mouse.down()
  await frame.locator("#trash").hover()
  await page.mouse.up()

  await expect(frame.locator("#trash li h5")).toHaveText(["High Tatras 2", "High Tatras 4"])

})