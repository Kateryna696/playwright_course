import {Locator , Page} from '@playwright/test';
import HomePage from './homePage';

export default class RegPage extends HomePage{
    readonly signupName: Locator = this.page.locator('#signupName');
    readonly signupLastName: Locator = this.page.locator('#signupLastName');
    readonly signupEmail: Locator =  this.page.locator('#signupEmail');
    readonly signupPassword: Locator = this.page.locator('#signupPassword');
    readonly signupRepeatPassword: Locator =  this.page.locator('#signupRepeatPassword');
    readonly registerButton: Locator = this.page.locator('button:has-text("Register")');
    readonly invalidFeedback: Locator = this.page.locator('.invalid-feedback');


    async focusBlurLocator(locator: Locator){
        await locator.focus();
        await locator.blur();
    }

    async fillBlurLocator(locator: Locator, text: string){
        await locator.fill(text);
        await locator.blur();
    }

}