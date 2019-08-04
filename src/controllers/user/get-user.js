const User = require(`../../model/user.model`);

const getUser = (req, res) => {
	const userId = req.userId;

	const sendResponse = data => {
		res.json({
			status: 'success',
			user: data,
		});
	};

	const sendError = (err, code) => {
		const status = code || 404;

		res.status(status).json({
			err,
			message: err.massage,
		});
	};

	User.findById(userId)
		.then(userFromDB => {
			const respData = {
				userName: userFromDB.userName,
				token: userFromDB.token,
				userData: userFromDB.userData,
			};
			sendResponse(respData);
		})
		.catch(sendError);
};

module.exports = getUser;
