import { test } from '@playwright/test';
import { CartPage } from '../pages/CartPage'; 
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

// Test Suite: Verify cart content correctness
test.describe('Cart Content Verification', () => {

  // Before each test: login and add products to cart
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cart = new CartPage(page);

    // Step 1: Navigate to site
    await LoginPage.goToBaseURL(page);

    // Step 2: Perform login
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');

    // Step 3: Add two products to cart
    await homePage.addProductToCart();

    // Step 4: Open cart page
    await cart.goToCart();
  }); 

  test('Verify product names in cart', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.verifyProductName();
  });

  test('Verify product prices in cart', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.verifyProductPrice();
  });

  test('Verify product quantities in cart', async ({ page }) => {
    const cart = new CartPage(page);
    await cart.verifyProductQuantity();
  });
}); 


// Test Suite: Removing items from cart
test.describe('Remove items from cart', () => {

  // Before each test: login and add products to cart
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const cart = new CartPage(page);

    await LoginPage.goToBaseURL(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await homePage.addProductToCart();
    await cart.goToCart();
  }); 

  test('Verify removing products from cart', async ({ page }) => {
    const cart = new CartPage(page);
    const homePage = new HomePage(page);

    // Remove all products from cart
    await cart.removeProductsFromCartPage();

    // Assert cart is empty
    await homePage.assertCartIsEmpty();
  });
}); 


// Test Suite: Checkout with empty cart
test.describe('Checkout with empty cart', () => {

  // Before each test: login and open empty cart page
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const cart = new CartPage(page);

    await LoginPage.goToBaseURL(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');

    // Open empty cart page
    await cart.goToEmptyCart();
  }); 

  test('Verify user cannot checkout with empty cart', async ({ page }) => {
    const cart = new CartPage(page);
    const homePage = new HomePage(page);

    // Assert cart is empty
    await homePage.assertCartIsEmpty();

    // Assert URL does not change after trying to checkout
    await cart.assertThatUrlDoNotChange();
  });
});
