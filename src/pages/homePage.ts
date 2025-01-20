import {Locator , Page} from '@playwright/test';

export default class HomePage{
    readonly page: Page;
    readonly signUpButton: Locator;
    readonly signInButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.signUpButton = page.getByRole('button', {name: 'Sign up'});
        this.signInButton = page.getByRole('button', {name: 'Sign in'});
    }

    async openSignUpForm(){
        await this.signUpButton.click();
    }

    async openSignInForm(){
        await this.signInButton.click();
    }
}