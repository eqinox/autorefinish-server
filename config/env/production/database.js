const parse = require('pg-connection-string').parse;
const fs = require('fs');
const { host, port, database, user, password } = parse(process.env.DATABASE_URL);

module.exports = ({ env }) => ({
    connection: {
        client: 'postgres',
        connection: {
            host,
            port,
            database,
            user,
            password,
            ssl: {
                rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false), // For Heroku, set to true if using a self-signed certificate
                // ca: fs.readFileSync('../../eu-north-1-bundle.pem').toString(), // Path to the downloaded RDS root certificate
            },
        },
        debug: false,
    },
});