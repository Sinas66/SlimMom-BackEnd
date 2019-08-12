const UserEated = require('../../model/userEated.model');

const getUserEated = async (req, res) => {
	const userId = req.user._id;
	const dateFromReq = req.params.date;

	const dateToStartDay = await new Date(Date(dateFromReq));
	const getDate = await new Date(dateToStartDay).getDate();
	await dateToStartDay.setDate(getDate);
	await dateToStartDay.setHours(3, 0, 0, 0);

	const dateToEndDay = new Date(Date(dateFromReq)).setHours(23, 59, 59, 999);

	const sendResponse = products => {
		res.json({
			status: 'success',
			products,
		});
	};

	const sendError = err => {
		res.json({
			status: 'error',
			message: err.message,
		});
	};

	UserEated.find(
		{
			userId,
			createdDate: {
				$gte: await dateToStartDay,
				$lte: await dateToEndDay,
			},
		},
		{
			basicCalories: 0,
			basicWeight: 0,
			groupBloodNotAllowed: 0,
			createdDate: 0,
			userId: 0,
			__v: 0,
		},
	)
		.then(data => {
			sendResponse(data);
		})
		.catch(sendError);
};

module.exports = getUserEated;
