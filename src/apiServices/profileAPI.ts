import { Request } from "@playwright/test";


export default class ProfileController {

    private request;

    constructor(request) {
        this.request = request;
    }

    async getUserProfileInfo(cookies: string) {
        const response = await this.request.get('/api/users/profile', {
            headers: {
                'Cookie': `sid=${cookies}`
            }
        });

        return await response.json();
    }

    async putUserProfileInfo(cookies: string, name: string, lastName: string) {
        const response = await this.request.put(`/api/users/profile`,
            {
                data: {
                    "lastName": lastName,
                    "name": name
                },
                headers: {
                    'Cookie': `sid=${cookies}`
                }
            });
        return await response.json();
    }

}