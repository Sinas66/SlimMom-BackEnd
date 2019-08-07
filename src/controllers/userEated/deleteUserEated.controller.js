const UserEated = require('../../model/userEated.model');
const User = require('../../model/user.model');
const errors = require('../../config').errors.products;

const createUserEated = async (req, res) => {
	const { userId } = req;
	const { productId } = req.params;
	// console.log({ productId });

	const sendResponse = () => {
		res.status(201).json({
			status: 'success',
		});
	};

	const sendError = err => {
		console.log(err);
		res.status(400).json({
			status: 'error',
			message: err.message,
		});
	};

	UserEated.findByIdAndRemove(productId)
		.then(deletedProd => {
			if (!deletedProd) throw errors.doestExist;
			User.findByIdAndUpdate(
				userId,
				{
					$pull: { eatsRecorded: productId },
				},
				{ new: true },
			)
				.then(sendResponse)
				.catch(sendError);
		})
		.catch(sendError);
};
module.exports = createUserEated;
