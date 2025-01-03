import { randomUUID } from "node:crypto";

export class DatabaseMemory {

    #users = new Map();

    listUsers(query) {
        return Array.from(this.#users.entries()).map((user) => {
            const userId = user[0];
            const userData = user[1];

            return {
                id: userId,
                ...userData
            }
        }).filter(user => {
            if (query) {
                return user.name.includes(query);
            }
            return true;
        });
    }

    createUser(userData) {
        const userId = randomUUID(); // Cria um ID aleatório

        this.#users.set(userId, userData);
    }

    updateUser(userId, userData) {
        this.#users.set(userId, userData);
    }

    deleteUser(userId) {
        this.#users.delete(userId);
    }

}