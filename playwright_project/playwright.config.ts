import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 140000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    trace: 'on',
    video: 'on',
  },
  projects: [
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
  ],
});