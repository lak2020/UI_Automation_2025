import { Page , expect } from '@playwright/test';
import { BasePage } from './BasePage';
export class CartPage extends BasePage {
  constructor(page: Page) 
  {super(page);}

  // Navigate to the cart page
  async viewMiniCart() {
    await this.page.click('//*[@id="minicart-toggle"]/button');
    await this.page.waitForSelector('#mini-cart');
    console.log(`✅ Navigate to the Cart  on the Top right hand side`);

  }

  // Assert that a product is in the cart
  async assertProductInCart(index: number) {
    const productName = await this.page.locator(`//*[@id="mini-cart"]/div/form/div[2]/div[${index}]/div[2]/div/div[1]/div/h6/a`).innerText();
    console.log(`✅ Product Name: ${productName}`);
    const productPrice = await this.page.locator(`//*[@id="mini-cart"]/div/form/div[2]/div[${index}]/div[2]/div/div[1]/div/div/span`).innerText();
    console.log(`✅ Product price: ${productPrice}`);

  }

  // Assert subtotal
  async assertSubtotal() {
    const subtotal = await this.page.locator('//*[@id="mini-cart"]/div/form/div[3]/div[1]/div/span').innerText();
    console.log(`Subtotal: ${subtotal}`);
  }

  // Add quantity for the first product
  async increaseProductQuantity(index: number) {
    // Construct the XPath dynamically based on the product index
    const increaseButtonXPath = `//*[@id="mini-cart"]/div/form/div[2]/div[${index}]/div[2]/div/div[2]/div/div/div/button[2]`;
    // Locate the button
    const increaseButton = this.page.locator(`xpath=${increaseButtonXPath}`);
  
    // Ensure the button is visible before clicking
    await expect(increaseButton).toBeVisible();
  
    // Click the "+" button to increase the quantity
    await increaseButton.click();
  
    console.log(`✅ Increased quantity for product`);
    await this.page.waitForTimeout(2000);
  }
  
  async viewCartPage(){
    await this.page.click(' //*[@id="mini-cart"]/div/form/div[3]/div[2]/button[1]');
    console.log(`✅ View cart page successfully`);
  }

  // Assert that a product is in the cart
  async assertProductInViewCart(index: number) {

    await this.scrollDown(); // Using from Base class

    const productName = await this.page.locator(`//*[@id="MainContent"]/div[2]/div/div[2]/div/div[${index}]/div[2]/div[1]/a`).innerText();
    console.log(`✅ Product Name: ${productName}`);
    const productPrice = await this.page.locator(`//*[@id="MainContent"]/div[2]/div/div[2]/div/div[${index}]/div[2]/div[3]/span`).innerText();
    console.log(` ✅ Product price: ${productPrice}`);

  }

    // Assert Viewcartsubtotal
    async assertViewCartSubtotal() {

      const subtotal = await this.page.locator('//*[@id="MainContent"]/div[2]/div/div[4]/div[1]/div[2]/h3').innerText();
      console.log(`✅ Subtotal: ${subtotal}`);
    }

  // Check availability
  async checkAvailability(postcode: string) {

    await this.page.click('//*[@id="fulfilment-options"]/div/div/button');
    await this.page.fill('//*[@id="jbtextfield-location-search"]', postcode);
    await this.page.press('//*[@id="jbtextfield-location-search"]', 'Enter');
  }

async selectLocation(location :string) {
  await this.page.waitForTimeout(3000); // Optional wait, adjust if necessary
  try {
       // Fill the postcode field with '300'
       await this.page.fill('//*[@id="jbtextfield-location-search"]', '300'); 

       // Wait for the dropdown to load
       await this.page.waitForSelector('//*[@id="location-search"]/section/div/ul/li'); // Adjust selector if needed
       
       // Locate all list items
       const listItems = await this.page.locator('//*[@id="location-search"]/section/div/ul/li');
       
       // Find the matching list item containing the passed location (e.g., "Melbourne VIC 3004")
       const matchingItem = await listItems.locator(`text=${location}`);
       console.log(`Matching location: ${location}`);

       // Wait for the matching location to be attached and visible
       await matchingItem.waitFor({ state: 'attached' });

       // Ensure the location is scrolled into view
       await matchingItem.scrollIntoViewIfNeeded();

       // Check if the location is enabled and visible
       const isEnabled = await matchingItem.isEnabled();
       console.log(`Location is enabled: ${isEnabled}`);

       const isVisible = await matchingItem.isVisible();
       console.log(`Location is visible: ${isVisible}`);

       // If enabled and visible, click the location
       if (isEnabled && isVisible) {
           await matchingItem.click();
           console.log(`✅ Location selected successfully!`);
       } else {
           console.error(`❌ Location is either disabled or not visible. Cannot click.`);
       }
  } catch (error) {
      console.error(`❌ Error selecting location:`, error);
      // Capture a screenshot for debugging
      await this.page.screenshot({ path: 'error-screenshot.png' });
      console.log('Screenshot saved as error-screenshot.png');
  }
}

  // Close availability panel
  async closeAvailabilityPanel() {
    await this.page.waitForTimeout(2000); 
    await this.page.getByTestId('pop-out-drawer-close-button').click();
    console.log('✅ close previous availablity panel');
  }
}