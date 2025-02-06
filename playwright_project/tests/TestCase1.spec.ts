import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';



test('Test Case 1: Search TV and add TV to shopping cart', async ({ page }) => {
  test.setTimeout(140000); // Set timeout for this specific test to 140 seconds


  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);

  // Navigate to homepage
  await homePage.goto();

  // Search for "TV" and filter price range
  await homePage.searchProduct('TV');
  await homePage.setPriceFilter(500, 4000);
  await homePage.toggleSalesItems("include");
  await homePage.applyFilter();

  // Add 1st and 3rd TV to the cart
  await homePage.addToCart([1]); // Add product 1
  await homePage.addToCart([3]); // Add product 3

  // Navigate to cart
  await cartPage.viewMiniCart();

  // Assert product names, prices, and subtotal
  await cartPage.assertProductInCart(2);   //product 1 TV
  await cartPage.assertProductInCart(3);   //product 3 TV
  await cartPage.assertSubtotal();

  
});