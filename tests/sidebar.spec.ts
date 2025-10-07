import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SidebarPage } from '../pages/SidebarPage';

// Test suite for verifying the logout feature
test.describe('User Logout Functionality', () => {

  // Before each test: open the login page and log in with valid credentials
  test.beforeEach(async ({ page }) => {
    await LoginPage.goToBaseURL(page);
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
  });

  // Test case: ensure user is redirected to login page after logout
  test('should redirect user to login page after successful logout', async ({ page }) => {
    const sidebar = new SidebarPage(page);

    // Open sidebar menu
    await sidebar.openSidebarMenu();

    // Select the logout option
    await sidebar.chooseToLogout();

    // Verify that the user is redirected to the login page URL
    await sidebar.assertGoingBackToBaseUrl();
  });
});
