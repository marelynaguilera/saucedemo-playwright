const { expect } = require("@playwright/test");

exports.ProductsPage = class ProductsPage {
  constructor(page) {
    this.page = page;
    this.titleLabel = page.locator(
      "#header_container .header_secondary_container span.title"
    );
  }

  async addProductToCart(productName) {
    const addToCartBtn = await this.getAddToCartBtn(productName);
    await addToCartBtn.click();
  }

  async getAddToCartBtn(productName) {
    return this.page.locator(
      `//div[text()='${productName}']//ancestor::div[@class='inventory_item_description']//div[@class='pricebar']//button`
    );
  }
};
