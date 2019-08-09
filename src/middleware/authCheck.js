const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const { secret } = require(`../config`);
const SECRET_KEY = process.env.SECRET_KEY_FOR_JWT || secret;

const authCheck = (req, res, next) => {
	const token = req.headers.authorization;

	const sendError = err => {
		res.status(400).json({
			status: `error`,
			message: err.message,
		});
	};

	if (token) {
		const clearToken = token.replace(`Bearer `, ``);
		// console.log({ clearToken });

		jwt.verify(clearToken, SECRET_KEY, (err, decoded) => {
			if (err) {
				res.status(401).json({
					error: err,
					message: err.message,
				});
			}

			User.findById({ _id: decoded.userId })
				.then(findUser => {
					req.user = findUser;
					next();
				})
				.catch(sendError);
		});
	} else {
		res.status(401).json({
			err: `error`,
			message: `Not Authorization field in header`,
		});
	}
};

module.exports = authCheck;
