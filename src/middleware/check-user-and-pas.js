const { errors } = require(`../config.js`);

const checkBodyForUserNameAndPass = (req, res, next) => {
	const user = req.body;

	const sendError = (err, code) => {
		let statusCode = code || 400;
		let message =
			err || `middleware check username & password exist in req is bugy`;

		res.status(statusCode).json({
			err: message,
		});
	};

	if (req.headers[`content-type`] !== `application/json`) {
		sendError(errors.onlyJson); // Пропускаем только json
		return;
	} else if (!user.userName && !user.password) {
		sendError(errors.passAndUserRequired); // Если нет userName и password то шлем ошибку
		return;
	} else if (!user.userName) {
		sendError(errors.userRequired); // Если нет userName то шлем ошибку
		return;
	} else if (!user.password) {
		sendError(errors.passRequired); // Если нет Password то шлем ошибку
		return;
	}

	next();
};

module.exports = checkBodyForUserNameAndPass;
