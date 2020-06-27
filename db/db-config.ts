export default {
    host: process.env.DB_HOST,
    port: <number><unknown>(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};