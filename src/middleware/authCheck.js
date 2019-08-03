const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET;

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
			req.user = { id: decoded.userId };
			next();
		});

		// invalid token - synchronous
		// try {
		//   var decoded = jwt.verify(clearToken, SECRET_KEY);
		// } catch (err) {
		//   console.log({ err });
		//   // err
		// }
	} else {
		res.status(401).json({
			err: `error`,
			message: `Not Authorization field in header`,
		});
	}
};

module.exports = authCheck;
