import {test , expect} from '@playwright/test';
import RegPage from '../../src/pages/regPage';

test.describe.parallel('Registration Form suit', () =>{
    let regPage: RegPage;
    const randomInt = Math.floor(Math.random() * 10000);
    const uniquEmail =`aqa.kustova+${randomInt}@gmail.com`; 
    const password='Kat12345';
    const url ='https://guest:welcome2qauto@qauto.forstudy.space/'
    
    test.beforeEach('', async ({page})=>{
       regPage = new RegPage(page);
       await page.goto(url);
       await regPage.openSignUpForm();
    });

    test('Name- Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await regPage.focusBlurLocator(regPage.signupName);
        await expect(regPage.invalidFeedback).toHaveText('Name required');
        await expect(regPage.signupName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Last Name- Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await regPage.focusBlurLocator(regPage.signupLastName);
        await expect(regPage.invalidFeedback).toHaveText('Last name required');
        await expect(regPage.signupLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Email - Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await regPage.focusBlurLocator(regPage.signupEmail);
        await expect(regPage.invalidFeedback).toHaveText('Email required');
        await expect(regPage.signupEmail).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Password - Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await regPage.focusBlurLocator(regPage.signupPassword);
        await expect(regPage.invalidFeedback).toHaveText('Password required');
        await expect(regPage.signupPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Re-password - Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await regPage.focusBlurLocator(regPage.signupRepeatPassword);
        await expect(regPage.invalidFeedback).toHaveText('Re-enter password required');
        await expect(regPage.signupRepeatPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();

    });
   
    test('Name - Errors are shown for wrong data, border color is red, button Register is disabled', async ({page})=>{
        await regPage.fillBlurLocator(regPage.signupName, 'John$'); // symbols
        await expect(regPage.invalidFeedback).toHaveText('Name is invalid');
        await expect(regPage.signupName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Name - Errors are shown for wrong length, border color is red, button Register is disabled', async ({page})=>{
        await regPage.fillBlurLocator(regPage.signupName, 'A'); // 1 char
        await expect(regPage.invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(regPage.signupName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
        
        await regPage.signupName.clear();
        await regPage.fillBlurLocator(regPage.signupName, 'qwertyuiopasdfghjklzx'); // 21char
        await expect(regPage.invalidFeedback).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(regPage.signupName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Last Name - Errors are shown for wrong data, border color is red, button Register is disabled', async ({page})=>{
        await regPage.fillBlurLocator(regPage.signupLastName, 'Саша'); // not english
        await expect(regPage.invalidFeedback).toHaveText('Last name is invalid');
        await expect(regPage.signupLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Last Name - Errors are shown for wrong length, border color is red, button Register is disabled', async ({page})=>{
        await regPage.fillBlurLocator(regPage.signupLastName, 'A'); // 1 char
        await expect(regPage.invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(regPage.signupLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
        
        await regPage.signupLastName.clear();
        await regPage.fillBlurLocator(regPage.signupLastName, 'qwertyuiopasdfghjklzx'); // 21char
        await expect(regPage.invalidFeedback).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(regPage.signupLastName).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Email - Errors are shown for wrong data, border color is red, button Register is disabled', async ({page})=>{
        await regPage.fillBlurLocator(regPage.signupEmail, 'email');
        await expect(regPage.invalidFeedback).toHaveText('Email is incorrect');
        await expect(regPage.signupEmail).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
        
        await regPage.signupEmail.clear();
        await regPage.fillBlurLocator(regPage.signupEmail, '123');
        await expect(regPage.invalidFeedback).toHaveText('Email is incorrect');
        await expect(regPage.signupEmail).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Password - Errors are shown for wrong data, border color is red, button Register is disabled', async ({page})=>{
        await regPage.fillBlurLocator(regPage.signupPassword, 'Aa34567'); //7char
        await expect(regPage.invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(regPage.signupPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();

        await regPage.signupPassword.clear();
        await regPage.fillBlurLocator(regPage.signupPassword, 'Aa34567891234567'); //16 char;
        await expect(regPage.invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(regPage.signupPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();

        await regPage.signupPassword.clear();
        await regPage.fillBlurLocator(regPage.signupPassword, 'aa3456789123456'); //without capital letter
        await expect(regPage.invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(regPage.signupPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();

        await regPage.signupPassword.clear();
        await regPage.fillBlurLocator(regPage.signupPassword, 'A3456789123456'); //without small letter
        await expect(regPage.invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(regPage.signupPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
        
        await regPage.signupPassword.clear();
        await regPage.fillBlurLocator(regPage.signupPassword, '13456789123456'); //without letters
        await expect(regPage.invalidFeedback).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(regPage.signupPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });
    
    test('Re-password - Error is shown if password do not match, border color is red, button Register is disabled', async ({page})=>{
        
        await regPage.signupPassword.fill('Aa345678');
        await regPage.fillBlurLocator(regPage.signupRepeatPassword, 'Ba345679');
        await expect(regPage.invalidFeedback).toHaveText('Passwords do not match');
        await expect(regPage.signupRepeatPassword).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(regPage.registerButton).toBeDisabled();
    });

    test('Successfull Sign Up', async ({page})=>{
        await regPage.signupName.fill('Kateryna');
        await regPage.signupLastName.fill('Kustova');
        await regPage.signupEmail.fill(uniquEmail);
        await regPage.signupPassword.fill(password);
        await regPage.signupRepeatPassword.fill(password);
        await regPage.registerButton.click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });
})