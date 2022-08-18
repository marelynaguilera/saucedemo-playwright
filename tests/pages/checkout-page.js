const { expect } = require("@playwright/test");

exports.CheckoutPage = class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postalCodeInput = page.locator("#postal-code");
    this.continueBtn = page.locator("#continue");
    this.paymentInformationLabel = page.locator(
      `.summary_info .summary_info_label >> text='Payment Information:'`
    );
    this.shippingInformationLabel = page.locator(
      `.summary_info .summary_info_label >> text='Shipping Information:'`
    );
    this.itemsTotalLabel = page.locator(
      `.summary_info div:has-text("Item total")`
    );
    this.thankYouLabel = page.locator(
      `#checkout_complete_container h2:text("THANK YOU FOR YOUR ORDER")`
    );
    this.finishBtn = page.locator("#finish");
  }

  async fillInformationForm(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueBtn.click();
  }

  async getProductLink(productName) {
    return this.page.locator(`//a//div[text()='${productName}']`);
  }
};
