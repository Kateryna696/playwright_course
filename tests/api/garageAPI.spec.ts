import { expect, test } from '@playwright/test';
import CarsController from '../../src/apiServices/carsAPI';
import AuthController from '../../src/apiServices/authAPI';
import { USERS } from '../../test-data/creds/users'

test.describe(('Garage Api tests using controllers'), () => {
    let carsController: CarsController;
    let authController: AuthController;
    let sid;

    test.beforeAll(async ({ request }) => {
        authController = new AuthController(request);
        sid = await authController.signInAndGetCookie(USERS.mainUser.email, USERS.mainUser.password)
    })

    test.beforeEach(async ({ request }) => {
        carsController = new CarsController(request);
        authController = new AuthController(request);
    })

    test('Add new car 1 (success)', async () => {
        const response = await carsController.addCar(1,1,122, sid);
        const newCar = response.data;
        expect(newCar).toBeDefined();
        expect(newCar.brand).toBe('Audi');
    });

    test('Add new car 2 (failed - non existed brandID)', async () => {
        const response = await carsController.addCar(7,6,122, sid);
        const newCar = response;
        expect(newCar.message).toBe('Brand not found');

    });

    test('Add new car 3 (failed - non existed modelID)', async () => {
        const response = await carsController.addCar(6,666,122, sid);
        const newCar = response;
        expect(newCar.message).toBe('Brand not found');

    });

    test('Get car by id (success)', async () => {
        const getCarsResponse = await carsController.getUserCars(sid);
        const carId = getCarsResponse.data[0].id;
        
        const response = await carsController.getCarById(carId, sid);
        const getCar = response.data;
        expect(getCar).toBeDefined();
        expect(getCar.id).toBe(carId);
    });

    test('Get car by id (failed)', async () => {
       
        const response = await carsController.getCarById(555551111111, sid);
        const getCar = response;
        expect(getCar.message).toBe("Car not found");
    });

    test('Edit car by id (success)', async () => {
        const getCarsResponse = await carsController.getUserCars(sid);
        const carId = getCarsResponse.data[0].id;
        const response = await carsController.editCar(1,1,150, sid, carId);
        const editCar = response.data;
        expect(editCar).toBeDefined();
        expect(editCar.mileage).toBe(150);
    });

    test('Edit car by id (failed)', async () => {
    
        const response = await carsController.editCar(1,1,180, sid, 1005000);
        const editCar = response;
        expect(editCar.message).toBe("Car not found");
    });

     test('Remove last added car', async () => {
        const getCarsResponse = await carsController.getUserCars(sid);
        const lastAddedCarId = getCarsResponse.data[0].id;

        const deleteCarResponse = await carsController.deleteCarById(lastAddedCarId, sid);
        expect(deleteCarResponse.data.carId).toBe(lastAddedCarId);

    });

})