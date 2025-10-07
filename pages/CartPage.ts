// Cart.ts
import { Page, expect } from '@playwright/test';

export class CartPage 
{
    readonly page: Page;
    //first product data
    readonly firstProductName = 'Sauce Labs Backpack';
    readonly firstProductPrice = '$29.99';
    readonly firstProductQuantity = '1';

    //first product selectors
    readonly firstProductNameSelector = '[data-test="item-4-title-link"]';
    readonly firstProductPriceSelector = '[data-test="inventory-item-price"]'
    //Selector Chain
    readonly firstProductQuantitySelector = '.cart_item:has-text("Sauce Labs Backpack") >> [data-test="item-quantity"]'
    readonly firstProductRemoveBtnSelector = '[data-test="remove-sauce-labs-backpack"]';
    
    //second product data
    readonly secondProductName = 'Sauce Labs Bike Light';
    readonly secondProductPrice = '$9.99';
    readonly secondProductQuantity = '1';

    //second product selectors
    readonly secondProductNameSelector = '[data-test="item-0-title-link"]';
    readonly secondProductPriceSelector = '.cart_item:has-text("Sauce Labs Bike Light") >> [data-test="inventory-item-price"]';
    readonly secondProductQuantitySelector = '.cart_item:has-text("Sauce Labs Bike Light") >> [data-test="item-quantity"]'

    readonly cartBadgeSelector = '[data-test="shopping-cart-badge"]';
    readonly secondProductRemoveBtnSelector = '[data-test="remove-sauce-labs-bike-light"]';

    readonly checkoutButton = '[data-test="checkout"]';
    readonly emptyCartSelector = '[data-test="shopping-cart-link"]';

    constructor(page: Page) 
    {
        this.page = page;
    }

    // Navigate to the cart page
    async goToCart() 
    {
        await this.page.click(this.cartBadgeSelector);
    }

    async goToEmptyCart()
    {
        await this.page.locator(this.emptyCartSelector).click();
    }

    async goToCheckoutForm()
    {
        await this.page.click(this.checkoutButton);
    }

    // Verify that the products names is displayed correctly
    async verifyProductName() 
    {
        // Verify that the first product name is correct
        const firstProducActualtName = await this.page.textContent(this.firstProductNameSelector);
        expect(firstProducActualtName).toBe(this.firstProductName);
        // Verify that the second product name is correct
        const secondProducActualtName = await this.page.textContent(this.secondProductNameSelector);
        expect(secondProducActualtName).toBe(this.secondProductName);

    }

    // Verify that the product price is correct
    async verifyProductPrice() 
    {
        // Verify that the first product price is correct
        const firstProductActualPrice = await this.page.textContent(this.firstProductPriceSelector);
        expect(firstProductActualPrice).toBe(this.firstProductPrice);

        // Verify that the second product price is correct
        const secondproductActualPrice = await this.page.textContent(this.secondProductPriceSelector);
        expect(secondproductActualPrice).toBe(this.secondProductPrice);
    }

    // Verify that the quantity is correct (default 1)
    async verifyProductQuantity(expectedQuantity: string = '1') 
    {
        // Verify that the first product quantity is correct
        const firstProductActualQuantity = await this.page.textContent(this.firstProductQuantitySelector);
        expect(firstProductActualQuantity).toBe(expectedQuantity);

        // Verify that the second product quantity is correct
        const secondProductActualQuantity = await this.page.textContent(this.secondProductQuantitySelector);
        expect(secondProductActualQuantity).toBe(expectedQuantity);
    }
    async removeProductsFromCartPage()
    {
        await this.page.locator(this.firstProductRemoveBtnSelector).click();
        await this.page.locator(this.secondProductRemoveBtnSelector).click();
    }

    
    async assertThatUrlDoNotChange()
    {
        const currentUrl = this.page.url();
        await this.page.locator(this.checkoutButton).click();
        await expect(this.page).toHaveURL(currentUrl);
    }
    async clickCheckoutButton() 
    {
        await this.page.locator(this.checkoutButton).click();
    }
}
