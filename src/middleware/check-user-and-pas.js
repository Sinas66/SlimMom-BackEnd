const errors = require(`../config.js`).errors.auth;

const checkBodyFornicknameAndPass = (req, res, next) => {
	const user = req.body;

	const sendError = (err, code) => {
		const statusCode = code || 400;
		const message =
			err || `middleware check nickname & password exist in req is bugy`;

		res.status(statusCode).json({
			status: 'error',
			message,
			example: {
				nickname: 'Pasha',
				password: 'Awesome_01',
			},
			optional: {
				message:
					'if user register(no token in local storage) and calc calories before = userData is required! (from redux store)',
				example: {
					nickname: 'Pasha',
					password: 'Awesome_01',
					example: {
						nickname: 'Pasha',
						password: 'Awesome_01',
						userData: {
							currentWeight: 80,
							desiredWeight: 60,
							height: 170,
							age: 25,
							calloriesPerDay: 1543.3,
							groupBlood: 1,
						},
					},
				},
			},
		});
	};

	if (req.headers[`content-type`] !== `application/json`) {
		sendError(errors.onlyJson); // Пропускаем только json
		return;
	}
	if (!user.nickname && !user.password) {
		sendError(errors.passAndUserRequired); // Если нет nickname и password то шлем ошибку
		return;
	}
	if (!user.nickname) {
		sendError(errors.userRequired); // Если нет nickname то шлем ошибку
		return;
	}
	if (!user.password) {
		sendError(errors.passRequired); // Если нет Password то шлем ошибку
		return;
	}

	next();
};

module.exports = checkBodyFornicknameAndPass;
