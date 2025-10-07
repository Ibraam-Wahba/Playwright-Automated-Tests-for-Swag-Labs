import { Page, expect } from '@playwright/test';

// HomePage class represents the main product page after login
export class HomePage 
{
  readonly page: Page;

  // Selectors for the "Add to cart" button and the cart badge
  readonly firstProductAddBtn = '[data-test="add-to-cart-sauce-labs-backpack"]'; 
  readonly secondProductAddBtn = '#add-to-cart-sauce-labs-bike-light';
  readonly cartBadge = '[data-test="shopping-cart-badge"]';

  readonly firstProductRemoveBtn = '[data-test="remove-sauce-labs-backpack"]'; 
  readonly secondProductRemoveBtn = '#remove-sauce-labs-bike-light';

  constructor(page: Page) 
  {
    this.page = page;
  }

  // Clicks the "Add to cart" button
  async addProductToCart() 
  {
    await this.page.click(this.firstProductAddBtn);
    await this.page.click(this.secondProductAddBtn);
  }

    // Clicks the "remove from cart" button
 async removeProductfromCart() 
  {
    await this.page.click(this.firstProductRemoveBtn);
    await this.page.click(this.secondProductRemoveBtn);
  }
  // Asserts that the cart badge shows the expected number of items
  async assertCartBadge(expectedCount: number) 
  {
    const badgeText = await this.page.textContent(this.cartBadge);
    expect(badgeText).toBe(String(expectedCount));
  }

   async assertCartIsEmpty() 
  {
    await expect(this.page.locator(this.cartBadge)).toHaveCount(0);
  }

  
}
