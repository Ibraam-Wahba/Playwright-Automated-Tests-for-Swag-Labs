import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

// Test suite: Verify cart badge updates correctly after add/remove actions
test.describe('Cart Badge Functionality', () => {

  // Shared setup before each test
  test.beforeEach(async ({ page }) => {
    await LoginPage.goToBaseURL(page);
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
  });

  // Test: Verify cart badge shows correct count after adding a product
  test('Verify cart badge increases after adding a product', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.addProductToCart();
    await homePage.assertCartBadge(2);
  });

  // Test: Verify cart badge is removed after removing a product
  test('Verify cart badge disappears after removing a product', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.addProductToCart();
    await homePage.removeProductfromCart();
    await homePage.assertCartIsEmpty();
  });
});
