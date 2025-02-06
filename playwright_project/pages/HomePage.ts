import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  
  constructor(page: Page) 
  {super(page);}
  
  // Navigate to the homepage
  async goto() {

    await this.page.goto('https://www.jbhifi.com.au/');
    await this.page.goto("https://www.jbhifi.com.au/", { waitUntil: 'load', timeout: 140000 });
  }

  // Search for a product (e.g., TV)
  async searchProduct(query: string) {
      // Ensure search bar is available and click it
  await this.page.waitForSelector('//*[@id="quicksearch-search-box"]/input', { timeout: 6000 });
  await this.page.click('//*[@id="quicksearch-search-box"]/input');
  await this.page.fill('input.input-search', query);
  console.log(' ✅ Search input field on homepage Succss:' , {query} );

  }

  // Set price filter
  async setPriceFilter(minPrice: number, maxPrice: number) {

  // Click the "Price range" button to open the filter  and set min/max prices 
    await this.page.click('button.search-price-range-button',  { timeout: 6000 });
    //await this.page.waitForTimeout(3000);
    await this.page.fill("//div[@class='search-price-range-dropdown scoped-form-styles active']//input[@id='min-input']", `${minPrice}`);

    //await this.page.waitForTimeout(3000);
    await this.page.fill("//div[@class='search-price-range-dropdown scoped-form-styles active']//input[@id='max-input']", `${maxPrice}`);
    console.log(' ✅ Set price ranges sucess:', {minPrice} , 'and' , {maxPrice} );
    //await this.page.locator("//div[@class='search-price-range-dropdown scoped-form-styles active']//input[@type='checkbox']").click();

  }

 // Method to toggle the checkbox to include or exclude sales items
async toggleSalesItems(action: "include" | "exclude") {
  const checkboxLocator = "//div[@class='search-price-range-dropdown scoped-form-styles active']//input[@type='checkbox']";
  
  // Check if the checkbox is present
  const checkbox =  this.page.locator(checkboxLocator);
  const isCheckboxPresent = await checkbox.isVisible();

  if (isCheckboxPresent) {
    const isChecked = await checkbox.isChecked();
    
    if (action === "include" && !isChecked) {
      // If action is "include" and checkbox is unchecked, click it to include sales items
      await checkbox.click();
      console.log('✅ Sales items included.');
    } else if (action === "exclude" && isChecked) {
      // If action is "exclude" and checkbox is checked, click it to exclude sales items
      await checkbox.click();
      console.log('✅ Sales items excluded.');
    }
  } else {
    console.log('Checkbox for sales items is not available.');
  }
}

  // Apply filters
  async applyFilter() {
    //await this.page.waitForTimeout(1000);
    await this.page.locator("//button[@class='search-price-range-dropdown--search']").click();
    console.log(`✅ Product search result displayed successfully`);
    await this.scrollDown(); // Using from Base class
  }

async addToCart(products: number[]) {
      await this.page.waitForTimeout(3000);
  for (const index of products) {
      console.log(`✅ Product ${index} Added to Cart Successfully`);

      // Using the correct locator based on your existing logic
      await this.page.locator(`(//div[@class='search-results-loop']//div[${index}]//div[3]//div[1]//div[1]//div[2]//div[1]//button[1])`).click({ force: true });
      await this.page.click('text=Continue shopping');
  }
}

}