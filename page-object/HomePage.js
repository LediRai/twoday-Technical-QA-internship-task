import { CommonPageObject } from "./CommonPageObject";

export class HomePage extends CommonPageObject {
  constructor(page) {
    super(page);
  }
  async open(){
   await this.page.goto('/');
  }
}
