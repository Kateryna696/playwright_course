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
    userGaragePage: async ({ page }, use) => {
        await page.goto('/');
        homePage = new HomePage(page);
        regPage = new RegPage(page);
        garagePage = new GaragePage(page);
        loginFrom = new LoginForm(page);

        await page.goto('/');
        await homePage.openSignInForm();
        await loginFrom.loginSuccess('kustova.kate+101@gmail.com', 'Kat12345');

        await use(garagePage);
    }
})