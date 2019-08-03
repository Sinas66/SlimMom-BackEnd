const bcrypt = require('bcrypt');
const User = require('../../../model/user.model');

const { secret } = require(`../../../config`);

const register = (req, res) => {
	const user = req.body;

	const sendResponse = data => {
		res.json({
			status: 'success',
			user: data,
		});
	};

	const sendError = error => {
		let errMessage = 'user was not saved';
		// console.log('user err', error);
		if (error === `Password is required` || error === `userName is required`) {
			errMessage = error;
		}
		if (error && error.message && !error.code) {
			errMessage = error.message;
		} else if (
			error &&
			error.code === 11000 &&
			error.errmsg.includes('email')
		) {
			errMessage = 'email already exist';
		} else if (
			error &&
			error.code === 11000 &&
			error.errmsg.includes('userName')
		) {
			// console.log(JSON.stringify(error));
			errMessage = 'userName already exist';
		}

		res.status(400).json({
			err: errMessage,
		});
	};

	const newUserData = {
		...user,
		password: bcrypt.hashSync(user.password.trim(), 10),
	};

	const newUser = new User(newUserData);

	newUser
		.save()
		.then(userFromDB => ({
			userName: userFromDB.userName,
			token: userFromDB.token,
		}))
		.then(sendResponse)
		.catch(sendError);
};

module.exports = register;
