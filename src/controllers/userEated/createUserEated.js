const Products = require('../../model/products.model');
const UserEated = require('../../model/userEated.model');
const User = require('../../model/user.model');

const createUserEated = async (req, res) => {
	const { userId } = req;
	const userProductSelected = req.params.productId;
	const userProductWeight = req.body.weight;
	const userDateSelected = req.body.date;
	console.log({ userProductWeight });
	const sendError = err => {
		res.status(400).json({
			err,
			message: err.message,
		});
	};

	const sendResponse = data => {
		res.status(201).json({
			status: `success`,
			eatedProduct: data,
		});
	};

	Products.findOne({ _id: userProductSelected })
		.then(findProduct => {
			return {
				title: findProduct.title,
				basicCalories: findProduct.calories,
				basicWeight: findProduct.weight,
				calories: findProduct.calories * (userProductWeight / 100),
				weight: userProductWeight,
				groupBloodNotAllowed: findProduct.groupBloodNotAllowed,
				createdDate: userDateSelected,
				userId,
			};
		})
		.then(eatedProduct => {
			UserEated.create(eatedProduct)
				.then(newRecord => {
					User.findByIdAndUpdate(
						userId,
						{
							$push: { eatsRecorded: newRecord._id },
						},
						{ new: true },
					)
						// .then(() => {
						// 	return UserEated.find({ userId });
						// })
						.then(() => sendResponse())
						.catch(sendError);
				})

				.catch(sendError);
		})
		.catch(sendError);
};

module.exports = createUserEated;
