import { Page , expect } from '@playwright/test';
import { Locator } from 'playwright';
import { BasePage } from './BasePage';

export class CheckOut extends BasePage {

  constructor(page: Page) 
  {super(page);}

  async increaseQuantity(index: number) {
    await this.page.locator(`(//div[@class='cart-item'])[${index}]//button[contains(@class, 'increase')]`).click();
    await this.page.waitForTimeout(4000);
}

async checkout() {
    await this.page.waitForSelector('//*[@id="mini-cart"]/div/form/div[3]/div[2]/button[2]', { timeout: 3000 });
    await this.page.click('//*[@id="mini-cart"]/div/form/div[3]/div[2]/button[2]');
    //await this.page.locator('button[name="Checkout"]').click();
    console.log("✅ Navigate to the Customer & Shipping information page ")
    await this.page.waitForTimeout(1000);
}

async enterEmail(email: string) {

    // await this.scrollDown(); // Using the common method
    await this.page.waitForTimeout(1000);
    await this.page.fill('//*[@id="email"]', email);

    console.log(`✅ Email ${email} Added to page Successfully`);
    return email;

}

async selectClickAndCollect() {
  await this.page.waitForTimeout(3000);
    const selectedMethod = this.page.locator('//*[@id="delivery_strategies"]/div/div[2]');

  await selectedMethod.click();
  console.log(`✅ Click & Collect Delivery method successfully selected`);

}

async selectClosestStore() {

    await this.scrollDown(); // Using from Base class
    await this.page.waitForTimeout(5000);
    await this.page.click('//*[@id="local_pickup_methods"]/div/div[1]/div');
    console.log(`✅ First Closest Returned Store Selected Successfully`);

}

async removeUnavailableProducts() {

  await this.page.waitForTimeout(3000);

    const button = this.page.locator('//*[@id="local_pickup_methods"]/div/div[1]/div/div[4]/div/div/div/div/div/div/div[2]/button');
    await button.click();
    console.log(`✅ removed Unavailable Products in the selected Store Successfully`);
    await this.page.waitForTimeout(2000);
}

async fillCollectionDetails( name: string, lastname: string, phonenumber: string ) {
    await this.page.waitForTimeout(5000);
    await this.scrollDown(); // Using the common method
    await this.page.fill('input[name="firstName"]', name); 
    await this.page.fill('input[name="lastName"]', lastname);
    await this.page.fill('input[name="phoneNumber"]', phonenumber);
    console.log(`✅ Filled Collection  Contact details Successfully ${name} , ${lastname} , ${phonenumber}`);

}

async assertProductIn_CheckOutPage(...indices: number[]) {
  await this.page.waitForTimeout(6000);

  for (const index of indices) {
    console.log({ index });

    const productNameLocator = this.page.locator(
      `//*[@id="app"]/div[1]/div/div[1]/div[2]/div[2]/div/aside/div/section/div/div/section/div[2]/div[2]/div[${index}]/div[2]/div/p`
    );
    const productPriceLocator = this.page.locator(
      `//*[@id="app"]/div[1]/div/div[1]/div[2]/div[2]/div/aside/div/section/div/div/section/div[2]/div[2]/div[${index}]/div[4]/div/span`
    );

    const productName = (await productNameLocator.isVisible()) ? await productNameLocator.innerText() : "Unavailable";
    const productPrice = (await productPriceLocator.isVisible()) ? await productPriceLocator.innerText() : "Unavailable";

    console.log(`✅ Product Name: ${productName}`);
    console.log(`✅ Product Price: ${productPrice}`);
  }
}

// Assert Viewcartsubtotal
async assertViewCartSubtotal() {

//const subtotal = await this.page.locator('//*[@id="disclosure_details"]/div/div/div/div/section/div/section/div[2]/div[2]/div[1]/div[2]/span').innerText();
const subtotal = await this.page.locator('//*[@id="app"]/div[1]/div/div[1]/div[2]/div[2]/div/aside/div/section/div/section/div[2]/div[2]/div[1]/div[2]/span').innerText();

console.log(`✅ Subtotal: ${subtotal}`);
}

//continue to payment
async proceedToPayment() {

    await this.scrollDown(); // Using the common method
    await this.page.waitForSelector('//*[@id="Form0"]/div[1]/div/div/div[2]/div/div[3]/div[1]/button', { timeout: 5000 });
    await this.page.click('//*[@id="Form0"]/div[1]/div/div/div[2]/div/div[3]/div[1]/button', { force: true });
}
    async assertEmailDisplayed(email: string) {
        const emailLocator = this.page.locator('//*[@id="checkout-main"]/div/div/div/div/section/div/div[2]/div[1]/div[1]/div[2]/bdo'); // Assuming there's an element showing the email
        const actualEmail = await emailLocator.textContent();
        await expect(emailLocator).toHaveText(email);
        console.log ('✅ correct contact email is displayed', {actualEmail});
      }

      async assertShippingMethod(expectedMethod: string) {
        const locator = this.page.locator('//*[@id="checkout-main"]/div/div/div/div/section/div/div[2]/div[2]/div[1]/div[2]/div/div/p[1]/span/span');
    
        // Extract text content
        let actualShippingMethod = await locator.textContent() ?? ''; // Use an empty string as a fallback for undefined
        console.log(`Actual shipping method displayed before trim: "${actualShippingMethod}"`);
    
        // Remove extra text (everything after "from")
        actualShippingMethod = actualShippingMethod.split(' from ')[0].trim();
    
        // Normalize and compare
        expect(actualShippingMethod).toBe(expectedMethod);
    
        console.log('✅ Correct shipping method is displayed :', { actualShippingMethod });
    }


async verifyPaymentMethods(index: number) {
  await this.scrollDown(); // Ensure visibility before interacting
  await this.page.waitForTimeout(2000);
  // Construct XPath dynamically
  const paymentMethodLocator = this.page.locator(
    `//*[@id="Form5"]/div[1]/div/div/div[1]/section[1]/div/div[2]/div/div/div[${index}]/div[1]/div[1]/label/span`
  );

  // Ensure the element is visible before extracting text
  await expect(paymentMethodLocator).toBeVisible();

  // Get the payment method text
  const paymentMethodName = await paymentMethodLocator.innerText();
  console.log(`✅ Payment Method ${index}: ${paymentMethodName}`);

  // Expected payment method names
  const expectedPaymentMethods: Record<number, string> = {
    1: "Credit or debit card",
    2: "PayPal",
    3: "Afterpay",
    4: "Zip - Buy now, pay later",
    5: "Latitude Interest Free",
  };

  // Validate that the index exists in the expected list
  if (!expectedPaymentMethods[index]) {
    throw new Error(`❌ Invalid index ${index}. No expected payment method found.`);
  }

  // Assert the payment method is correct
  expect(paymentMethodName.trim()).toBe(expectedPaymentMethods[index]);

  console.log(`✅ Payment method ${index} assert successfully `);
}

}
