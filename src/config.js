const dbUser = 'admin';
const dbPassword = 'admin';

const config = {
    port: 8081,
    databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-hpf7b.mongodb.net/test?retryWrites=true&w=majority`,
}

module.exports = config;
