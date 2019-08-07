const UserEated = require('../../model/userEated.model');

const getUserEated = (req, res) => {
	const { userId } = req;

	console.log({ params: req.params.date });

	const dateFromReq = Date(req.params.date);
	console.log({ dateFromReq });

	const newDate = new Date(dateFromReq);
	console.log({ newDate });

	const newDateToISO = newDate.toISOString();
	console.log({ newDateToISO });

	const sendResponse = products => {
		res.json({
			status: 'success',
			products,
		});
	};

	// Надо что б возвращало все продукты сьденые юзером за определенный день

	const sendError = err => {
		res.json({
			status: 'error',
			message: err.message,
		});
	};

	UserEated.find({ userId, createdDate: { $eq: newDateToISO } })
		.then(data => {
			console.log(data);
			return data;
		})
		// UserEated.find()
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getUserEated;
