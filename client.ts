import { Client } from 'pg';

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});

client.connect()
.then(() => {console.log('Connected to the database.')})
.catch((err) => {console.error('Error connecting to database:', err); process.exit(1);});   

export default client;