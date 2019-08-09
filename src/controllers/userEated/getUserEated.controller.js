const UserEated = require('../../model/userEated.model');

const getUserEated = (req, res) => {
	const userId = req.user._id;

	console.log({ params: req.params.date });
	const dateFromReq = Date(req.params.date);

	const day = dateFromReq.getDate();
	console.log({ day });
	// console.log({ dateFromReq });
	// const newDate = new Date(dateFromReq);
	// console.log({ newDate });
	// const newDateToISO = newDate.toISOString();
	// console.log({ newDateToISO });

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

	UserEated.find({ userId, createdDate: { $eq: dateFromReq } })
		.then(data => {
			console.log(data);
			return data;
		})
		// UserEated.find()
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getUserEated;
