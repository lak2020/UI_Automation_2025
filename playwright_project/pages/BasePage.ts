import { Page, BrowserContext } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected context: BrowserContext;

    constructor(page: Page) {
        this.page = page;
        this.context = page.context(); // ✅ Ensure we get the correct context

        // ✅ Automatically dismiss all dialogs
        this.page.on('dialog', async (dialog) => {
            console.log(`Dialog detected: ${dialog.message()}`);
            await dialog.dismiss();
        });
    }

    // ✅ Block geolocation requests completely
    async blockGeolocationRequests() {
        await this.page.route('**/geolocation/**', (route) => {
            console.log("Blocking geolocation request: ", route.request().url());
            route.abort(); // Stop the request
        });
    }

    // ✅ Override geolocation permissions
    async overrideGeolocation() {
        await this.context.grantPermissions(['geolocation']);
        await this.context.setGeolocation({ latitude: 37.7749, longitude: -122.4194 }); // Example: San Francisco
    }

    // ✅ Navigate with geolocation blocked
    async navigate(url: string) {
        await this.overrideGeolocation(); // Set before navigation
        await this.blockGeolocationRequests(); // Block popups
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    // ✅ Close location pop-up manually
    async dismissLocationPopup() {
        const popup = this.page.locator('text=www.jbhifi.com.au wants to');
        if (await popup.isVisible()) {
            console.log("Location pop-up detected, dismissing...");
            await this.page.locator('text=Never allow').click();
            await this.page.waitForTimeout(1000);
        }
    }

    // ✅ Improved Scroll Method
    async scrollDown(times: number = 3, delay: number = 2000) {
        for (let i = 0; i < times; i++) {
            await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await this.page.waitForTimeout(delay);
        }
    }
}
