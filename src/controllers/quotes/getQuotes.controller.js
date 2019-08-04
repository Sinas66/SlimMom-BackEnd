const Quotes = require(`../../model/quotes.model`);

const getQuotes = (req, res) => {
	const sendResponse = products => {
		res.json({
			status: 'success',
			products,
		});
	};

	const sendError = (err, code) => {
		const status = code || 404;
		res.status(status).json({
			message: err.message,
			err,
		});
	};

	Quotes.find()
		.then(sendResponse)
		.catch(sendError);
};

module.exports = getQuotes;
