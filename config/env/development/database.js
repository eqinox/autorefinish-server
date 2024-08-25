const path = require('path');

module.exports = ({ env }) => {
    const client = env('DATABASE_CLIENT', 'postgres');

    const connections = {
        postgres: {
            client: 'postgres',
            connection: {
                host: env('DATABASE_HOST', 'localhost'),
                port: env.int('DATABASE_PORT', 5432),
                database: env('DATABASE_NAME', 'sweetsurprises'),
                user: env('DATABASE_USERNAME', 'postgres'),
                password: env('DATABASE_PASSWORD', 'Samoenter123'),
                ssl: false, // Set SSL to false for local development
            },
        },
    };

    return {
        connection: {
            client,
            ...connections[client],
            acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
        },
    };
};