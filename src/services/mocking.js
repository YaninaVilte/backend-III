import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";
import petModel from "../dao/models/Pet.js";
import userModel from "../dao/models/User.js";

class MockingService {

    static async generateMockingPets(num) {
        const pets = [];

        for (let i = 0; i < num; i++) {
            const pet = {
                name: faker.animal.dog(),
                specie: faker.animal.type(),
                adopted: false
            };

            const savedPets = await petModel.create(pet);
            pets.push(savedPets);
        }
        return pets;
    }

    static async generateMockingUsers(num) {
        const users = [];
        for (let i = 0; i < num; i++) {
            const user = {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: await createHash("coder123"),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: []
            };
            const savedUsers = await userModel.create(user);
            users.push(savedUsers);
        }
        return users;
    }

    static async getUsers() {
        return await userModel.find();
    }

    static async getPets() {
        return await petModel.find();
    }
}

export default MockingService; 