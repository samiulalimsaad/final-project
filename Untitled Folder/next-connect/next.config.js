require("dotenv").config();

module.exports = {
    serverRuntimeConfig: {
        DATABASE_URL: process.env.DATABASE_URL,
    },
};
