const dbUser = 'admin';
const dbPassword = 'admin';

const config = {
	port: 8081,
	databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-hpf7b.mongodb.net/test?retryWrites=true&w=majority`,
	// databaseUrl: `mongodb+srv://slims:goit34GH@healthproject-hrchz.mongodb.net/test?retryWrites=true&w=majority`,
	secret: `secret key`,
	errors: {
		userRequired: `userName is reqaaauired`,
		userExist: 'User doesnt exist',
		passInvalid: `Password is ivalid`,
		passRequired: `password is required`,
		passAndUserRequired: `username and password is required`,
		onlyJson: `request content-type must be application/json only`,
	},
	tokenLifeTime: `30d`,
};

module.exports = config;
