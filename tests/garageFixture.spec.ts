import { expect, Locator, chromium, Page } from '@playwright/test';
import { mergeTests } from '@playwright/test';
import { test } from '../src/fixtures/fixtureBase';


test.describe(('Adding cars in the Garage Page with using fixtures'), () => {

    test('Add a car 1', async ({ userGaragePage }) => {
        await userGaragePage.addCarByBrandAndModel('Audi', 'TT');
        expect('Audi TT').toBe(await userGaragePage.getLastAddedCarName());
    });

    test('Add a car 2', async ({ userGaragePage}) => {
        await userGaragePage.addCarByBrandAndModel('Porsche', '911');
        expect('Porsche 911').toBe(await userGaragePage.getLastAddedCarName());
    });

    test('Add a car 3', async ({ userGaragePage }) => {
        await userGaragePage.addCarByBrandAndModel('Fiat', 'Panda');
        expect('Fiat Panda').toBe(await userGaragePage.getLastAddedCarName());
    });

})

