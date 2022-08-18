const { expect } = require("@playwright/test");

exports.CommonsPage = class CommonsPage {
  constructor(page) {
    this.page = page;
    this.titleLabel = page.locator(
      "#header_container .header_secondary_container span.title"
    );
    this.shoppingCartLink = page.locator(
      "#shopping_cart_container a.shopping_cart_link"
    );
    this.errorMessageLabel = page.locator(`.error-message-container.error h3`);
  }
};
