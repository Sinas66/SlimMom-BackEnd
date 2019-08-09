// const UserEated = require('../../model/userEated.model');

const getUserEated = (req, res) => {
	// const userId = req.user._id;
	const dateFromReq = req.params.date;
	// const newDate = new Date(dateFromReq);

	// const newDateToISO = newDate.toISOString();
	// console.log({ newDateToISO });

	res.json({ dateFromReq, user: req.user });
	// const sendResponse = products => {
	// 	res.json({
	// 		status: 'success',
	// 		products,
	// 	});
	// };

	// // Надо что б возвращало все продукты сьденые юзером за определенный день

	// const sendError = err => {
	// 	res.json({
	// 		status: 'error',
	// 		message: err.message,
	// 	});
	// };

	// UserEated.find({ userId, createdDate: { $eq: newDateToISO } })
	// 	.then(data => {
	// 		console.log(data);
	// 		return data;
	// 	})
	// 	// UserEated.find()
	// 	.then(sendResponse)
	// 	.catch(sendError);
};

module.exports = getUserEated;
