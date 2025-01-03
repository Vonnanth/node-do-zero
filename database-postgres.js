import { sql } from './db.js';

export class DatabasePostgres {

    #users = new Map();

    async listUsers(search) {
        let users;

        if (search)
            users = await sql`select * from users where name ilike "%${search}%"`;
        else
            users = await sql`select * from users`;

        return users;
    }

    async createUser(userData) {
        const { name, age, sex } = userData;

        await sql`insert into users (name, age, sex) values (${name}, ${age}, ${sex})`;
    }

    async updateUser(userId, userData) {
        await sql`update users set name = ${userData.name}, age = ${userData.age}, sex = ${userData.sex} where id = ${userId}`
    }

    async deleteUser(userId) {
        await sql`delete from users where id = ${userId}`
    }
}