import { Page, expect } from '@playwright/test';

export class SidebarPage {
  readonly page: Page;

  // Selector for the menu (hamburger) button
  readonly hamburgerMenuSelector = '[data-test="username"]';

  // Selector for the logout link inside the sidebar menu
  readonly logoutLinkSelector = '[data-test="logout-sidebar-link"]';

  // Base URL of the application 
  readonly BaseUrl = 'https://www.saucedemo.com/';

  constructor(page: Page) 
  {
    this.page = page;
  }

  // Verify that the user is redirected to the base URL after logout
  async assertGoingBackToBaseUrl() 
  {
    await expect(this.page).toHaveURL(this.BaseUrl);
  }

  // Open the sidebar menu by clicking on the hamburger (menu) button
  async openSidebarMenu() 
  {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
  }

  // Click on the logout link to log out of the application
  async chooseToLogout() 
  {
    await this.page.locator(this.logoutLinkSelector).click();
  }
}
