import { CommonPageObject } from "./CommonPageObject";

export class CheckoutPage extends CommonPageObject {
  constructor(page) {
    super(page);
    this.email = page.getByRole("textbox", { name: "Email Address" });
    this.firstName = page.getByLabel("First Name");
    this.lastName = page.getByLabel("Last Name");
    this.company = page.getByLabel("Company");
    this.address = page.getByLabel("Street Address: Line 1");
    this.city = page.getByLabel("City");
    this.state = page.locator('select[name="region_id"]');
    this.zipCode = page.getByLabel("Zip/Postal Code");
    this.country = page.getByLabel("Country");
    this.phoneNumber = page.getByLabel("Phone Number");
    this.nextBtn = page.getByRole("button", { name: "Next" });
    this.placeOrderBtn = page.getByRole("button", { name: "Place Order" });
  }

  async fillEmail(email) {
    await this.email.waitFor();
    await this.email.fill(email);
  }
  async fillFirstName(firstName) {
    await this.firstName.waitFor();
    await this.firstName.fill(firstName);
  }
  async fillLastName(lastName) {
    await this.lastName.waitFor();
    await this.lastName.fill(lastName);
  }
  async fillCompany(company) {
    await this.company.waitFor();
    await this.company.fill(company);
  }
  async fillAddress(address) {
    await this.address.waitFor();
    await this.address.fill(address);
  }
  async fillCity(city) {
    await this.city.waitFor();
    await this.city.fill(city);
  }
  async selectCountry(country) {
    await this.country.waitFor();
    await this.country.selectOption({ value: country });
  }
  async selectState(state) {
    await this.state.waitFor();
    await this.state.selectOption({ label: state });
  }
  async fillZipCode(zipCode) {
    await this.zipCode.waitFor();
    await this.zipCode.fill(zipCode);
  }
  async fillPhoneNumber(phoneNumber) {
    await this.phoneNumber.waitFor();
    await this.phoneNumber.fill(phoneNumber);
  }

  async goToShippingDetails() {
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(3000);
    await this.nextBtn.click();
  }

  async completeTheOrder() {
    await this.page.waitForLoadState("load");
    await this.page.waitForTimeout(3000);
    await this.placeOrderBtn.click();
  }
}
