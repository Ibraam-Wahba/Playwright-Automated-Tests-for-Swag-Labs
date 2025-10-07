import { Page, expect } from '@playwright/test';

export class CheckoutPage
{
    // Page reference
    readonly page: Page;

    // Selectors for checkout form fields and buttons
    readonly firstNameSelector = '[data-test="firstName"]';
    readonly lastNameSelector = '[data-test="lastName"]';
    readonly postalCodeSelector = '[data-test="postalCode"]';
    readonly continueButtonSelector = '[data-test="continue"]';
    readonly finishButtonSelector = '[data-test="finish"]';
    readonly checkoutCompleteMessageSelector = '[data-test="complete-header"]';
    readonly cancelButtonSelector = '[data-test="cancel"]';

    // URLs for navigation validation
    readonly homePageUrl = 'https://www.saucedemo.com/inventory.html';
    readonly checkoutFormUrl = 'https://www.saucedemo.com/checkout-step-one.html';
    readonly checkoutOverviewUrl = 'https://www.saucedemo.com/checkout-step-two.html';
    readonly checkoutCompleteUrl = 'https://www.saucedemo.com/checkout-complete.html';

    constructor(page: Page)
    {
        this.page = page;
    }

    
    //Fill checkout form fields with provided first name, last name, and postal code    
    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string)
     {
        // Fill first name field
        await this.page.fill(this.firstNameSelector, firstName);

        // Fill last name field
        await this.page.fill(this.lastNameSelector, lastName);

        // Fill postal code field
        await this.page.fill(this.postalCodeSelector, postalCode);
    }

    
    //Click the Continue button to proceed to checkout overview
    async clickContinue()
    {
        await this.page.click(this.continueButtonSelector);
    }

    
    // Click the Cancel button 
    async clickCancel()
    {
        await this.page.click(this.cancelButtonSelector);
    }

    // Click the finish button 
    async clickFinish()
    {
        await this.page.click(this.finishButtonSelector);
    }
    
    // Assert that user is on checkout form page
    
    async assertOnCheckoutFormPage() 
    {
        await expect(this.page).toHaveURL(this.checkoutFormUrl);
    }

    
    // Assert that user is on checkout overview page
    
    async assertOnCheckoutOverviewPage() 
    {
        await expect(this.page).toHaveURL(this.checkoutOverviewUrl);
    }

    
    // Assert that user is on checkout complete page
     
    async assertOnCheckoutCompletePage() 
    {
        await expect(this.page).toHaveURL(this.checkoutCompleteUrl);
    }

    
    //Assert that user is back on home page 
    async assertOnHomePage() 
    {
        await expect(this.page).toHaveURL(this.homePageUrl);
    }

    
    // Assert that the confirmation message appears on the complete page
    async assertConfirmationMessage() 
    {
        const message = await this.page.textContent(this.checkoutCompleteMessageSelector);
        expect(message?.trim()).toBe("Thank you for your order!");
    }

}
