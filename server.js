import { fastify } from 'fastify';
import { DatabasePostgres } from './database-postgres.js'; //Necessário usar o .js no final, por causa do tipo 'module' do node

const server = fastify();
const database = new DatabasePostgres();

server.get('/users', async (request, response) => {
    const query = request.query.search;
    const users = await database.listUsers(query);

    return users;
});

server.post('/new-user', async (request, reply) => {
    const { name, age, sex } = request.body;

    await database.createUser({
        name,
        age,
        sex,
    });

    return reply.status(201).send();
});

server.put('/update-user/:id', async (request, reply) => {
    const userId = request.params.id;
    const { name, age, sex } = request.body;

    await database.updateUser(userId, {
        name,
        age,
        sex,
    });

    return reply.status(204).send();
});

server.delete('/delete-user/:id', (request, reply) => {
    const userId = request.params.id;

    database.deleteUser(userId);

    return reply.status(204).send();
});

server.get('/', () => {
    return 'Funfando!';
});

server.listen({
    port: process.env.PORT || 3000
}, () => console.log('Server running on http://localhost:3000'));