const UserEated = require('../../model/userEated.model');
const User = require('../../model/user.model');

module.exports.createUserEated = async (req, res) => {
	const userId = req.user.id;
	const productId = req.params.productId;

	try {
		const deletedProduct = UserEated.findByIdAndRemove(productId);

		if (deletedProduct) {
			const addNewEatedProductToUser = await User.findByIdAndUpdate(
				userId,
				{
					$pull: { eatsRecorded: productId._id },
				},
				{ new: true },
			);

			// можливо прийдеться вертати весь оновлений список продуктів

			if (addNewEatedProductToUser) {
				res.status(201).json({
					deletedProduct: deletedProduct,
				});
			}
		}
	} catch (error) {
		res.status(400).json({
			error: error,
			message: error.message,
		});
	}
};
