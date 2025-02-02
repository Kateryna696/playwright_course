import { test, expect, Locator } from '@playwright/test';
import HomePage from '../../src/pages/homePage';
import RegPage from '../../src/pages/regPage';
import GaragePage from '../../src/pages/garagePage';
import LoginForm from '../../src/pages/loginForm';


test.describe(('Setup users'), () => {
    let homePage: HomePage;
    let regPage: RegPage;
    let garagePage: GaragePage;
    let loginFrom: LoginForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        regPage = new RegPage(page);
        garagePage = new GaragePage(page);
        loginFrom = new LoginForm(page);
        await page.goto('/');
        await homePage.openSignInForm();
    })

    test('Log in and save state - main user', async ({ page }) => {
    
        await loginFrom.loginSuccess('kustova.kate+101@gmail.com', 'Kat12345');
        await garagePage.verifyPageIsOpen();
        await page.context().storageState({ path: './test-data/states/userOne.json' });
    });


})


