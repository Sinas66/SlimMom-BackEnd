const logout = (req, res) => {
	const sendResponse = user => {
		res.json({
			status: 'success',
			message: `User ${user} exit`,
		});
	};

	const sendError = error => {
		let errMessage = "User doesn't exist";

		if (error) {
			errMessage = error;
		}
		res.status(403).json({
			error: errMessage,
			message: errMessage,
		});
	};

	if (req.user) {
		sendResponse(req.user.nickname);
	} else {
		sendError();
	}
};

module.exports = logout;
