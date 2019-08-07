const UserEated = require('../../model/userEated.model');

const getUserEated = (req, res) => {
	// const { userId } = req;
	// const date = Date(req.params.date);

	// const day = new Date(dateFromReq).getDate();
	// const month = new Date(dateFromReq).getMonth() + 1;
	// const year = new Date(dateFromReq).getFullYear();

	// console.log(`${day}.${month}.${year}`);
	// console.log({ year });

	// const date = new Date(dateFromReq);
	// console.log({ date });
	// const date = `${day}.${month}.${year}`;

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

	// UserEated.find({ userId, createdDate: date })
	UserEated.find()
		.then(products => {
			console.log(products);
			return products;
		})
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getUserEated;
