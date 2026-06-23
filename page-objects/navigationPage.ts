import { Page } from "@playwright/test"

export class NavigationPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async formLayoutsPage() {
    await this.clickMainMenuItem("Forms")
    await this.page.getByText("Form Layouts").click()
  }

  async datepickerPage() {
    await this.clickMainMenuItem("Forms")
    await this.page.waitForTimeout(1000)
    await this.page.getByText("Datepicker").click()
  }

  async smartTablePage() {
    await this.clickMainMenuItem("Tables & Data")
    await this.page.getByText("Smart Table").click()
  }

  async toastrPage() {
    await this.clickMainMenuItem("Modal & Overlays")
    await this.page.getByText("Toastr").click()
  }

  async tooltipPage() {
    await this.clickMainMenuItem("Modal & Overlays")
    await this.page.getByText("Tooltip").click()
  }

  private async clickMainMenuItem(groupMenuTitle: string) {
    const mainMenuItem = this.page.getByRole("link", {name: groupMenuTitle})
    if(await mainMenuItem.getAttribute("aria-expanded") == "false") {
      await mainMenuItem.click()
    }
  }

}