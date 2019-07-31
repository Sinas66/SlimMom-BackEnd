const dbUser = 'admin';
const dbPassword = 'admin';

const config = {
	port: 8081,
	databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-hpf7b.mongodb.net/test?retryWrites=true&w=majority`,
	secret: `secret key`,
};

module.exports = config;
