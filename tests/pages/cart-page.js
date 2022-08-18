const { expect } = require("@playwright/test");

exports.CartPage = class CartPage {
  constructor(page) {
    this.page = page;
    this.checkoutBtn = page.locator("#checkout");
  }

  async getProductLink(productName) {
    return this.page.locator(`//a//div[text()='${productName}']`);
  }
};
