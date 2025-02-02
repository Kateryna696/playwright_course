import { test as base } from '@playwright/test'
import HomePage from '../../src/pages/homePage';
import RegPage from '../../src/pages/regPage';
import GaragePage from '../../src/pages/garagePage';
import LoginForm from '../../src/pages/loginForm';

 let homePage: HomePage;
 let regPage: RegPage;
 let garagePage: GaragePage;
 let loginFrom: LoginForm;

type garagePageTypes = {
    userGaragePage: GaragePage;
};

export const test = base.extend<garagePageTypes>({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: './test-data/states/userOne.json'
        });
        const page = await context.newPage();
        homePage = new HomePage(page);
        regPage = new RegPage(page);
        garagePage = new GaragePage(page);
        loginFrom = new LoginForm(page);
        await page.goto('/');
        await use(garagePage);
        await page.close();
    }
})