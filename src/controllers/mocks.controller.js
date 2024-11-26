import MockingService from "../services/mocking.js";
import { petsService, usersService } from "../services/index.js";


const getMockingPets = async (req, res) => {
    const pets = await MockingService.generateMockingPets(100);
    res.send({ status: "success", payload: pets });
}

const getMockingUsers = async (req, res) => {
    const users = await MockingService.generateMockingUsers(50);
    res.send({ status: "success", payload: users });
}

const generateDataPost = async (req, res) => {
    try {
        const { users = 0, pets = 0 } = req.body;

        if (isNaN(users) || isNaN(pets) || users < 0 || pets < 0) {
            return res.status(400).json({ error: "Los parámetros deben ser números positivos." });
        }

        const usersList = await MockingService.generateMockingUsers(Number(users));
        const petsList = await MockingService.generateMockingPets(Number(pets));

        return res.status(201).json({
            message: "Datos generados exitosamente",
            generated: {
                users: usersList.length,
                pets: petsList.length,
            },
        });
    } catch (error) {
        return res.status(500).json({ error: "Error al generar los datos" });
    }
};

const generateDataGet = async (req, res) => {
    try {
        const users = await MockingService.getUsers();
        const pets = await MockingService.getPets();

        return res.status(200).json({
            message: "Datos recuperados exitosamente",
            data: {
                users,
                pets,
            },
        });
    } catch (error) {
        console.error("Error al recuperar los datos:", error);
        return res.status(500).json({ error: "Error al recuperar los datos" });
    }
};



export default {
    getMockingPets,
    getMockingUsers,
    generateDataPost,
    generateDataGet
}