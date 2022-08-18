const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/login-page");
const { ProductsPage } = require("../pages/products-page");
const { CommonsPage } = require("../pages/commons-page");
const { CartPage } = require("../pages/cart-page");
const { CheckoutPage } = require("../pages/checkout-page");
const standardUserInfo = require("../../utils/data/standard-user-data.json");
const lockedUserInfo = require("../../utils/data/locked-user-data.json");

let productName;
let username;
let password;

test("Buy a backpack successfully", async ({ page }) => {
  username = standardUserInfo.username;
  password = standardUserInfo.password;
  productName = "Sauce Labs Backpack";
  const firstName = username;
  const lastName = password;
  const postalCode = standardUserInfo.postalCode;

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const commonsPage = new CommonsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);

  await expect(await commonsPage.titleLabel).toHaveText("Products");
  await productsPage.addProductToCart(productName);
  await commonsPage.shoppingCartLink.click();

  await expect(await commonsPage.titleLabel).toHaveText("Your Cart");
  await expect(await cartPage.getProductLink(productName)).toHaveCount(1);
  await cartPage.checkoutBtn.click();

  await expect(await commonsPage.titleLabel).toHaveText(
    "Checkout: Your Information"
  );
  await checkoutPage.fillInformationForm(firstName, lastName, postalCode);
  await expect(await commonsPage.titleLabel).toHaveText("Checkout: Overview");
  await expect(await checkoutPage.getProductLink(productName)).toHaveCount(1);
  await expect(await checkoutPage.paymentInformationLabel).toHaveCount(1);
  await expect(await checkoutPage.shippingInformationLabel).toHaveCount(1);
  await expect(await checkoutPage.itemsTotalLabel).toHaveCount(1);
  await checkoutPage.finishBtn.click();
  await expect(await commonsPage.titleLabel).toHaveText("Checkout: Complete!");
  await expect(await checkoutPage.thankYouLabel).toHaveCount(1);
});

test("Locked user is not able to login", async ({ page }) => {
  username = lockedUserInfo.username;
  password = lockedUserInfo.password;

  const loginPage = new LoginPage(page);
  const commonsPage = new CommonsPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);
  await expect(await commonsPage.errorMessageLabel).toBeVisible();
  await expect(await commonsPage.errorMessageLabel).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Error when trying to checkout with empty user information", async ({
  page,
}) => {
  username = standardUserInfo.username;
  password = standardUserInfo.password;
  productName = "Sauce Labs Backpack";
  const firstName = standardUserInfo.firstName;
  const lastName = standardUserInfo.lastName;
  const postalCode = standardUserInfo.postalCode;

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const commonsPage = new CommonsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(username, password);

  await expect(await commonsPage.titleLabel).toHaveText("Products");
  await productsPage.addProductToCart(productName);
  await commonsPage.shoppingCartLink.click();

  await expect(await commonsPage.titleLabel).toHaveText("Your Cart");
  await expect(await cartPage.getProductLink(productName)).toHaveCount(1);
  await cartPage.checkoutBtn.click();

  await expect(await commonsPage.titleLabel).toHaveText(
    "Checkout: Your Information"
  );

  await checkoutPage.continueBtn.click();
  await expect(await commonsPage.errorMessageLabel).toContainText("Error:");
});
