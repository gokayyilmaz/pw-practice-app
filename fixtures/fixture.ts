import { test as base } from "@playwright/test"

type MyFixture = {
  helloWorld: any
}

export const test = base.extend<MyFixture>({
  helloWorld: async({}, use) => {
    const hello = "Hello World"
    await use(hello)
    console.log("Goodbye")
  }
})