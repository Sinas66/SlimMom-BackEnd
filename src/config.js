const dbUser = 'admin';
const dbPassword = 'admin';

const config = {
	port: 8081,
	databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-hpf7b.mongodb.net/test?retryWrites=true&w=majority`,
	// databaseUrl: `mongodb+srv://slims:goit34GH@healthproject-hrchz.mongodb.net/test?retryWrites=true&w=majority`,
	secret: `secret key`,
	errors: {
		auth: {
			userRequired: `userName is reqaaauired`,
			userExist: 'User doesnt exist',
			passInvalid: `Password is ivalid`,
			passRequired: `password is required`,
			passAndUserRequired: `username and password is required`,
			onlyJson: `request content-type must be application/json only`,
		},
		calc: {
			allFieldsAreRequired: 'All fields are required!',
			ageHeightCeilNum: 'Age and height must be a ceil Number!',
			weightNum: 'Weight must be a Number!',
			ageIsRequired: 'Age is required!',
			ageRange: 'Age must be in range 1-99',
			heightIsRequired: 'Height is required!',
			heightRange: `Height must be in range 1-230`,
			currentWeightIsRequired: 'Current weight is required!',
			desiredWeight: 'Desired weight is required!',
			weightRange: 'Weight must be in range 1-199',
			onlyJson: `request content-type must be application/json only`,
			onlyLosingWeight: 'Desired weight cant be bigget then current',
		},
	},
	tokenLifeTime: `30d`,
};

module.exports = config;
