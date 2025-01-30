import {Locator , Page} from '@playwright/test';
import HomePage from './homePage';

export default class LoginForm extends HomePage{
   
    readonly signInEmail: Locator =  this.page.locator('#signinEmail');
    readonly signInPassword: Locator = this.page.locator('#signinPassword');
    readonly loginButton: Locator = this.page.getByRole('button', {name: 'Login'});


    async loginSuccess(email: string, password: string){
       await this.signInEmail.fill(email);
       await this.signInPassword.fill(password);
       await this.loginButton.click();
    }

}