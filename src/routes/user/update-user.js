const User = require('../../model/user.model');

const updateUser = (req, res) => {
	const userId = req.userId;
	const newUserData = req.body;

	const sendResponse = userData => {
		res.json({
			status: `success`,
			userData,
		});
	};

	const sendError = err => {
		res.status(400).json({
			err,
			meassage: err.message,
		});
	};

	User.findByIdAndUpdate(
		userId,
		{ $set: { userData: newUserData } },
		{ new: true },
	)
		.then(data => {
			const respData = {
				...data.userData,
			};
			sendResponse(respData);
		})
		.catch(sendError);
};

module.exports = updateUser;
