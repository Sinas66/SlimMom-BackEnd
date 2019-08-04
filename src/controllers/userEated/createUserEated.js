const Products = require('../../model/products.model');
const UserEated = require('../../model/userEated.model');
const User = require('../../model/user.model');

const createUserEated = async (req, res) => {
	const userId = req.user.id;
	const userProductSelected = req.params.productId;
	const userProductWeight = req.body.weight;
	const userDateSelected = req.body.date;

	try {
		const findProduct = await Products.findOne({ _id: userProductSelected });

		const completeUserProductSelected = {
			title: findProduct.title,
			basicCalories: findProduct.calories,
			basicWeight: findProduct.weight,
			calories: findProduct.calories * (userProductWeight / 100),
			weight: userProductWeight,
			groupBloodNotAllowed: findProduct.groupBloodNotAllowed,
			createdDate: userDateSelected,
			userId,
		};

		const newRecord = await UserEated.insertOne(
			await completeUserProductSelected,
		);

		if (newRecord) {
			const addNewEatedProductToUser = await User.findByIdAndUpdate(
				userId,
				{
					$push: { eatsRecorded: newRecord._id },
				},
				{ new: true },
			);

			if (addNewEatedProductToUser) {
				res.status(201).json({
					eatedProduct: newRecord,
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
