import { expect } from "@playwright/test";
import { PageHeader } from "../page-component/PageHeader";

export class CommonPageObject {
  constructor(page) {
    this.page = page;
    this.pageHeader = new PageHeader(this.page);
  }

  async assertTitle(title) {
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator("h1.page-title span.base")).toHaveText(title);
  }

  async goBack() {
    await this.page.goBack();
  }
}