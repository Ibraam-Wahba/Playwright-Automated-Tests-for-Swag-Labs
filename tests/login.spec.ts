import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Successful Login Tests', () => {

  // Run before each test to open the login page
  test.beforeEach(async ({ page }) => {
    await LoginPage.goToBaseURL(page);
  });

  // Test: standard_user should log in successfully
  test('Login_with_standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await loginPage.assertNavigateToHomePage()
  });

  // Test: problem_user should log in successfully
  test('Login_with_problem_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('problem_user', 'secret_sauce');
    await loginPage.assertNavigateToHomePage()
  });

  // Test: performance_glitch_user should log in successfully
  test('Login_with_performance_glitch_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('performance_glitch_user', 'secret_sauce');
    await loginPage.assertNavigateToHomePage()
  });

  // Test: error_user should log in successfully
  test('Login_with_error_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('error_user', 'secret_sauce');
    await loginPage.assertNavigateToHomePage()
  });

  // Test: visual_user should log in successfully
  test('Login_with_visual_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('visual_user', 'secret_sauce');
    await loginPage.assertNavigateToHomePage()
  });
});