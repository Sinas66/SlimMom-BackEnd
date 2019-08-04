const UserEated = require('../../model/userEated.model');
const User = require('../../model/user.model');

const createUserEated = async (req, res) => {
	const userId = req.user.id;
	const { productId } = req.params;

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
					deletedProduct,
				});
			}
		}
	} catch (error) {
		res.status(400).json({
			error,
			message: error.message,
		});
	}
};

module.exports = createUserEated;
