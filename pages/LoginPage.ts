import { Page, expect } from '@playwright/test';

// Page Object Model for the Login Page
export class LoginPage {
  readonly page: Page;

  // Element selectors for the login form
  readonly userNameSelector = '[data-test="username"]';         // Username input field
  readonly passwordSelector = '[data-test="password"]';         // Password input field
  readonly submitButtonSelector = '[data-test="login-button"]'; // Login button

  // URL of the home page after successful login
  readonly homePageUrl = 'https://www.saucedemo.com/inventory.html';

  // Base URL of the application
  static readonly BaseURL = 'https://www.saucedemo.com/';

  // Constructor receives the Playwright Page instance
  constructor(page: Page) 
  {
    this.page = page;
  }

  // Navigate directly to the base URL (login page)
  static async goToBaseURL(page: Page)
  {
    await page.goto(this.BaseURL);
  }

  // Perform login with the provided username and password
  async loginWithCredentials(username: string, password: string)
  {
    await this.page.fill(this.userNameSelector, username);   // Fill username field
    await this.page.fill(this.passwordSelector, password);   // Fill password field
    await this.page.click(this.submitButtonSelector);        // Click login button
  }

  // Verify that user successfully navigated to the home page
  async assertNavigateToHomePage() 
  {
    await expect(this.page).toHaveURL(this.homePageUrl);     // Assert page URL is correct
  }
}
