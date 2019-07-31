const jwt = require('jsonwebtoken');

const { secret } = require(`../../../config`);
const User = require('../../../db/schemas/user');

const logout = (req, res) => {
	const sendResponse = () => {
		res.json({
			status: 'success',
		});
	};

	const sendError = error => {
		let errMessage = 'User doesnt exist';

		if (error) {
			errMessage = error;
		}
		res.status(400).json({
			err: errMessage,
		});
	};

	const sendError403 = err => {
		let errMessage = `You cant do that ;(`;
		if (err) {
			errMessage = err;
		}

		res.status(403).json({
			err: errMessage,
		});
	};

	if (!req.user) {
		sendError403(`no token(`); // Если нет токена то шлем ошибку
		return;
	}

	const token = req.user.token.split(` `)[1]; // Парсим сам токен

	const isTokenValid = jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			if (err.message === 'jwt expired') {
				sendError403(`Token expired`);
				return false;
			}
			sendError403(err);
			return false;
		}
		if (decoded === undefined) {
			sendError403(`Invalid token`);
			return false;
		}
		return true;
	});

	if (isTokenValid) {
		const { userId } = jwt.decode(token);
		User.findByIdAndUpdate(userId, { $unset: { token: `` } }, { new: true })
			.then(sendResponse)
			.catch(sendError);
	}
};

module.exports = logout;
