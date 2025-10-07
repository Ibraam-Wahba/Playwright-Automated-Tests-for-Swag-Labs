import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout Process Tests', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const cart = new CartPage(page);

        // Step 1: Go to site
        await LoginPage.goToBaseURL(page);

        // Step 2: Login with standard_user
        await loginPage.loginWithCredentials('standard_user', 'secret_sauce');

        // Step 3: Add products to cart
        await homePage.addProductToCart();

        // Step 4: Go to cart page
        await cart.goToCart();
    });
    test('Navigate to Checkout Form page', async ({ page }) => {
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Go to checkout form page
        await cart.clickCheckoutButton();
        await checkout.assertOnCheckoutFormPage();
    });

    test('Navigate from Checkout Form to Overview page', async ({ page }) => {
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Go to checkout form
        await cart.clickCheckoutButton();
        await checkout.assertOnCheckoutFormPage();

        // Fill form and continue
        await checkout.fillCheckoutForm("John", "Doe", "12345");
        await checkout.clickContinue();
        await checkout.assertOnCheckoutOverviewPage();
    });

    test('Navigate from Overview page to Complete page', async ({ page }) => {
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Go to checkout form
        await cart.clickCheckoutButton();
        await checkout.assertOnCheckoutFormPage();

        // Fill form and continue
        await checkout.fillCheckoutForm("John", "Doe", "12345");
        await checkout.clickContinue();
        await checkout.assertOnCheckoutOverviewPage();

        // Finish checkout
        await checkout.clickFinish();
        await checkout.assertOnCheckoutCompletePage();
    });

    test('Verify confirmation message on Complete page', async ({ page }) => {
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Complete the checkout process
        await cart.clickCheckoutButton();
        await checkout.fillCheckoutForm("John", "Doe", "12345");
        await checkout.clickContinue();
        await checkout.clickFinish();

        // Verify confirmation message
        await checkout.assertConfirmationMessage();
    });
    // test('Cancel checkout and return to home page', async ({ page }) => {
    //     const cart = new CartPage(page);
    //     const checkout = new CheckoutPage(page);

    //     // Go to checkout form page
    //     await cart.clickCheckoutButton();
    //     await checkout.assertOnCheckoutFormPage();
    //     // Fill checkout form
    //     await checkout.fillCheckoutForm("John", "Doe", "12345");

    //     // Continue to overview page
    //     await checkout.clickContinue();
    //     await checkout.assertOnCheckoutOverviewPage();

    //     // Cancel checkout process
    //     await checkout.clickCancel();

    //     // Verify returned to home page
    //     await checkout.assertOnHomePage();
    // });

});
test.describe('Cancel Checkout Flow', () => {

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const cart = new CartPage(page);

        // Step 1: Go to site
        await LoginPage.goToBaseURL(page);

        // Step 2: Login
        await loginPage.loginWithCredentials('standard_user', 'secret_sauce');

        // Step 3: Add products to cart
        await homePage.addProductToCart();

        // Step 4: Go to cart page
        await cart.goToCart();
    });

    test('Cancel checkout and return to home page', async ({ page }) => {
        const cart = new CartPage(page);
        const checkout = new CheckoutPage(page);

        // Go to checkout form page
        await cart.clickCheckoutButton();
        await checkout.assertOnCheckoutFormPage();
        // Fill checkout form
        await checkout.fillCheckoutForm("John", "Doe", "12345");

        // Continue to overview page
        await checkout.clickContinue();
        await checkout.assertOnCheckoutOverviewPage();

        // Cancel checkout process
        await checkout.clickCancel();

        // Verify returned to home page
        await checkout.assertOnHomePage();
    });

});
