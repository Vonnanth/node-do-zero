import { sql } from './db.js';

sql`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL,
        sex CHAR(1) CHECK (sex IN ('M', 'F', 'O')) -- 'M' para masculino, 'F' para feminino, 'O' para outros.
    );
`.then(() => console.log('Tabela criada com sucesso!'));