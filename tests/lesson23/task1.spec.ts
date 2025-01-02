import {test , expect} from '@playwright/test';

test.describe.parallel('Registration Form suit', () =>{
    const randomInt = Math.floor(Math.random() * 10000);
    const uniquEmail =`aqa.kustova+${randomInt}@gmail.com`; 
    const password='Kat12345';

    const signupName = (page) => page.locator('#signupName');
    const signupLastName = (page) => page.locator('#signupLastName');
    const signupEmail = (page) => page.locator('#signupEmail');
    const signupPassword = (page) => page.locator('#signupPassword');
    const signupRepeatPassword = (page) => page.locator('#signupRepeatPassword');
    const registerButton = (page) => page.locator('button:has-text("Register")');
    const invalidFeedback = (page) => page.locator('.invalid-feedback');

    test.beforeEach('', async ({page})=>{
       await page.goto('https://guest:welcome2qauto@qauto.forstudy.space/');
       await page.locator('//button', {hasText: 'Sign Up'}).click();
    });

    test('Name- Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{

        await signupName(page).focus();
        await signupName(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Name required');
        await expect(signupName(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Last Name- Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await signupLastName(page).focus();
        await signupLastName(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Last name required');
        await expect(signupLastName(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Email - Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await signupEmail(page).focus();
        await signupEmail(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Email required');
        await expect(signupEmail(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Password - Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await signupPassword(page).focus();
        await signupPassword(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Password required');
        await expect(signupPassword(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Re-password - Error is shown for empty mandatory field, border color is red, button Register is disabled', async ({page})=>{
        await signupRepeatPassword(page).focus();
        await signupRepeatPassword(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Re-enter password required');
        await expect(signupRepeatPassword(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();

    });
   
    test('Name - Errors are shown for wrong data, border color is red, button Register is disabled', async ({page})=>{
        await signupName(page).fill('John$'); // symbols
        await signupName(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Name is invalid');
        await expect(signupName(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Name - Errors are shown for wrong length, border color is red, button Register is disabled', async ({page})=>{
        await signupName(page).fill('A'); // 1 char
        await signupName(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(signupName(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
        
        await signupName(page).clear();
        await signupName(page).fill('qwertyuiopasdfghjklzx'); // 21char
        await signupName(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Name has to be from 2 to 20 characters long');
        await expect(signupName(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Last Name - Errors are shown for wrong data, border color is red, button Register is disabled', async ({page})=>{
        await signupLastName(page).fill('Саша');// not english
        await signupLastName(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Last name is invalid');
        await expect(signupLastName(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Last Name - Errors are shown for wrong length, border color is red, button Register is disabled', async ({page})=>{
        await signupLastName(page).fill('A'); // 1 char
        await signupLastName(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(signupLastName(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
        
        await signupLastName(page).clear();
        await signupLastName(page).fill('qwertyuiopasdfghjklzx'); // 21char
        await signupLastName(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Last name has to be from 2 to 20 characters long');
        await expect(signupLastName(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Email - Errors are shown for wrong data, border color is red, button Register is disabled', async ({page})=>{
        await signupEmail(page).fill('email');
        await signupEmail(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Email is incorrect');
        await expect(signupEmail(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
        
        await signupEmail(page).clear();
        await signupEmail(page).fill('123');
        await signupEmail(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Email is incorrect');
        await expect(signupEmail(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Password - Errors are shown for wrong data, border color is red, button Register is disabled', async ({page})=>{

        await signupPassword(page).fill('Aa34567'); //7char
        await signupPassword(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(signupPassword(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();

        await signupPassword(page).clear();
        await signupPassword(page).fill('Aa34567891234567'); //16 char
        await signupPassword(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(signupPassword(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();

        await signupPassword(page).clear();
        await signupPassword(page).fill('aa3456789123456'); //without capital letter
        await signupPassword(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(signupPassword(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();

        await signupPassword(page).clear();
        await signupPassword(page).fill('A3456789123456'); //without small letter
        await signupPassword(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(signupPassword(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
        
        await signupPassword(page).clear();
        await signupPassword(page).fill('13456789123456'); //without letters
        await signupPassword(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await expect(signupPassword(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });
    
    test('Re-password - Error is shown if password do not match, border color is red, button Register is disabled', async ({page})=>{
        
        await signupRepeatPassword(page).fill('Aa345678');
        await signupRepeatPassword(page).fill('Ba345679');
        await signupRepeatPassword(page).blur();
        await expect(invalidFeedback(page)).toHaveText('Passwords do not match');
        await expect(signupRepeatPassword(page)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
        await expect(registerButton(page)).toBeDisabled();
    });

    test('Successfull Sign Up', async ({page})=>{
        await signupName(page).fill('Kateryna');
        await signupLastName(page).fill('Kustova');
        await signupEmail(page).fill(uniquEmail);
        await signupPassword(page).fill(password);
        await signupRepeatPassword(page).fill(password);
        await registerButton(page).click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    });
})