import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: false,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['html', {
    open: 'never'
  }], ['list']],
  use: {
      baseURL: `https://${process.env.AUTH_LOGIN}:${process.env.AUTH_PASS}@${process.env.BASE_URL}`,
      httpCredentials: {
        username: 'guest',
        password: 'welcome2qauto',
      },
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure', 
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '*setup/*.ts'
    },

    {
      name: 'regression',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup']
    },

    {
      name: 'api-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: '**api/*.spec.ts'
    },

   /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});