const jwt = require('jsonwebtoken');

const { secret } = require(`../config`);
const SECRET_KEY = process.env.SECRET_KEY_FOR_JWB || secret;

const authCheck = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		const clearToken = token.replace(`Bearer `, ``);
		// console.log({ clearToken });

		jwt.verify(clearToken, SECRET_KEY, function(err, decoded) {
			if (err) {
				res.status(401).json({
					error: err,
					message: err.message,
				});
				return;
			}
			req.userId = decoded.userId;
			next();
		});
	} else {
		res.status(401).json({
			err: `error`,
			message: `Not Authorization field in header`,
		});
	}
};

module.exports = authCheck;
