const User = require('../../../db/schemas/user');

const updateUser = (req, res) => {
	const userUpdateData = req.body;
	const { id } = req.params;

	console.log(`userUpdateData`, userUpdateData);
	console.log(`id`, id);

	const sendResponse = newUser => {
		res.json({
			status: `success`,
			newUser,
		});
	};

	const sendError = () => {
		res.status(400).json({
			err: 'there is no such user',
		});
	};

	User.findById(id)
		.then(user => {
			// console.log("user", user)
			// eslint-disable-next-line no-underscore-dangle
			const updatedUser = { ...user._doc, ...userUpdateData };
			console.log('updatedUser', updatedUser);
			User.findByIdAndUpdate({ _id: id }, updatedUser)
				.then(sendResponse)
				.catch(err => console.log(err));
		})
		.catch(sendError);
};

module.exports = updateUser;
