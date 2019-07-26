const startServer = require(`./src/server`)
const { port, databaseUrl } = require(`./src/config`)
const connectToDB = require(`./src/db/coonect-db`)


startServer(port);
connectToDB(databaseUrl);