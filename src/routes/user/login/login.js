const jwt = require('jsonwebtoken');
const { secret } = require(`../../../config`);
const bcrypt = require('bcrypt');
const User = require('../../../model/user.model');


const login = (req, res) => {
	const user = req.body;

	const errors = {
		userExist: 'User doesnt exist',
		passInvalid: `Password is ivalid`,
	};

	const sendResponse = data => {
		res.json({
			status: 'success',
			user: data,
		});
	};

	const sendError = error => {
		let errMessage = 'login sendError must be update with this case';

		if (error) {
			errMessage = error;
		}
		res.status(400).json({
			err: errMessage,
		});
	};

	const userNameReq = user.userName.trim().toLowerCase(); // Тримим и ловеркейсим userName
	const userPasswordReq = user.password.trim(); // Тримим и ловеркейсим userName

	const findUser = User.findOne({ userName: userNameReq });


	findUser.
		then(userFromDB => {
			if (!userFromDB) {
				throw errors.userExist // Если юзер не найдет, кидаем ошибку
			}
			userFromDB.comparePassword(userPasswordReq) // сравниваем пароли
				.then(resp => {
					if (!resp) throw errors.passInvalid; // Если пароль не валид, кидаем ошибку
					userFromDB.createNewToken() // Добавляем новый токен
						.then(sendResponse)
						.catch(sendError)
				})
				.catch(sendError)
		})
		.catch(sendError)
};

module.exports = login;
