import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CheckOut} from '../pages/CheckOut';

test('Test Case 3: Search TV, add to cart, proceed to checkout', async ({ page }) => {
    test.setTimeout(190000); // Set timeout for this specific test to 190 seconds

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const checkOut = new CheckOut(page);
    const email = "Nick1@gmail.com";
         
         // Navigate to homepage
    await homePage.goto();

        //Search for "TV" and filter price range
    await homePage.searchProduct('TV');
    await homePage.setPriceFilter(1500, 2500);
    await homePage.toggleSalesItems("include");
    await homePage.applyFilter();
           
         //Add 1st and 2nd TV to the cart
    await homePage.addToCart([1]); // Add product 1
    await homePage.addToCart([2]); // Add product 2

         //Navigate to cart
    await cartPage.viewMiniCart();

        //Add 1x more quantity for the 2nd TV 
    await cartPage.increaseProductQuantity(3); // select xpath value 3 for 1st TV

         //Navigate to Checkout
    await checkOut.checkout();
    await checkOut.enterEmail(email);
    await checkOut.selectClickAndCollect();
    await checkOut.selectClosestStore();
    await checkOut.removeUnavailableProducts();
    await checkOut.assertProductIn_CheckOutPage(1,2,3) // Verify contact info page product and prices after removing unavailable products
    await checkOut.assertViewCartSubtotal(); // Verify subtotal displayed correctly
    await checkOut.fillCollectionDetails('nick','dolen','0473254063');

        //Navigate to Payment page
    await checkOut.proceedToPayment();
    await checkOut.assertEmailDisplayed(email);
    await checkOut.assertShippingMethod('Click & Collect');

    await checkOut.verifyPaymentMethods(1); // Verify payment method for (Credit or debit card)
    await checkOut.verifyPaymentMethods(2); // Verify payment method for (Paypal)
    await checkOut.verifyPaymentMethods(3); // Verify payment method for (Afterpay)
    await checkOut.verifyPaymentMethods(4); // Verify payment method for (Zip - Buy now, pay later)
    await checkOut.verifyPaymentMethods(5); // Verify payment method for (Latitude Interest Free)

    await checkOut.assertProductIn_CheckOutPage(1,2,3); // Verify final payment page product and prices after removing unavailable products
    await checkOut.assertViewCartSubtotal(); // Verify final payment page  subtotal displayed correctly after removing unavailable products
});