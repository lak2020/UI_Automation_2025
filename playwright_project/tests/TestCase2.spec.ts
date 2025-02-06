import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test('Test Case 2: Search TV, add TV to shopping cart, navigate to cart page', async ({ page }) => {
     test.setTimeout(160000); // Set timeout for this specific test to 160 seconds

  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  // Navigate to homepage
  await homePage.goto();

  // Search for "TV" and filter price range
  await homePage.searchProduct('TV');
  await homePage.setPriceFilter(1000, 2000);
  await homePage.toggleSalesItems('exclude');
  await homePage.applyFilter();

  // Add the first 3 TV products to cart
  await homePage.addToCart([1]);
  await homePage.addToCart([2]);
  await homePage.addToCart([3]);

  // Navigate to cart
  await cartPage.viewMiniCart();

  //Add 1x more quantity for the 1st TV
  await cartPage.increaseProductQuantity(2); // select xpath value 2 for 1st TV

  // Proceed to View Cart Page
  await cartPage.viewCartPage();

  // Proceed to Cart Page and assert product details
  await cartPage.assertProductInViewCart(3); //product 1 
  await cartPage.assertProductInViewCart(4); //product 2
  await cartPage.assertProductInViewCart(5); //prodcut 3
  await cartPage.assertProductInViewCart(6); //product 4
  await cartPage.assertViewCartSubtotal();

  // Check availability and select location
  await cartPage.checkAvailability('3000');
  await cartPage.selectLocation('Melbourne VIC 3004'); 
  await cartPage.closeAvailabilityPanel();
  
});