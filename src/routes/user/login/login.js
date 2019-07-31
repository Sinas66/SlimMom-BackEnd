const jwt = require('jsonwebtoken');

const { secret } = require(`../../../config`);
const bcrypt = require('bcrypt');
const User = require('../../../db/schemas/user');

const login = (req, res) => {
	const user = req.body;

	const errors = {
		userExist: 'User doesnt exist',
		pasInvalid: `Password is ivalid`,
	};

	const sendResponse = data => {
		res.json({
			status: 'success',
			user: data,
		});
	};

	const sendError = error => {
		let errMessage = 'User doesnt exist';
		console.log(error);

		if (error) {
			errMessage = error;
		}
		res.status(400).json({
			err: errMessage,
		});
	};

	if (!user.userName) {
		sendError(`userName is required`); // Если нет userName то шлем ошибку
		return;
	}
	if (!user.password) {
		sendError(`Password is required`); // Если нет Password то шлем ошибку
		return;
	}

	const userNameReq = user.userName.trim().toLowerCase(); // Тримим и ловеркейсим userName
	const userPasswordReq = user.password.trim(); // Тримим и ловеркейсим userName

	const createToken = userId => {
		const token = jwt.sign({ userId, createdDate: Date.now() }, secret, {
			expiresIn: `30d`,
			noTimestamp: true,
		});
		return token;
	};

	const findUser = User.find({ userName: userNameReq });

	findUser
		.then(usersFromDB => {
			if (usersFromDB.length === 0) {
				throw errors.exist; // Если юзер не найдет кидаем ошибку
			}
			bcrypt
				.compare(userPasswordReq, usersFromDB[0].password) // сравниваем пароли
				.then(resp => {
					if (!resp) throw errors.pasInvalid;
					return usersFromDB[0];
				})
				.then(userFromDB => {
					const newToken = createToken(userFromDB.id);
					User.findByIdAndUpdate(
						userFromDB.id,
						{ $set: { token: newToken } },
						{ new: true },
						err => {
							if (err) throw err;
						},
					)
						.then(userWithNewToken => {
							const respData = {
								userName: userWithNewToken.userName,
								token: userWithNewToken.token,
							};
							return respData;
						})
						.then(sendResponse)
						.catch(sendError);
				})
				.catch(sendError);
		})
		.catch(sendError);
};

module.exports = login;
