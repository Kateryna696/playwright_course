import { expect, test } from '@playwright/test';

test.describe(('Mocking response body'), () => {
    test.use({ storageState: './test-data/states/userOne.json' })

    test.beforeEach(async ({ page }) => {
        await page.goto('/panel/profile');
    })


    test('Mock response body for the User Profile', async ({page}) => {
       const responseBody=
        {
            "status": "ok",
            "data": {
                "userId": 168694,
                "photoFilename": "default-user.png",
                "name": "Changed",
                "lastName": "Name"
            }
        }
        await page.route('**/api/users/profile', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(responseBody),
            });
        });
        
        await page.goto('/panel/profile');
        await expect(page.locator('.profile_name.display-4')).toHaveText('Changed Name');
       
    });
});