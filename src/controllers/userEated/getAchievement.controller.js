const UserEated = require('../../model/userEated.model');

const getAchevement = async (req, res) => {
	const userId = req.user._id;
	const dateFromReq = Date(req.params.date);

	const getDate = await new Date(dateFromReq).getDate();

	const dateToStartDay = new Date(
		new Date(new Date(dateFromReq).setHours(2, 59, 59, 999)).setDate(
			getDate + 1,
		),
	).toISOString();

	const dateToEndDay = new Date(
		new Date(new Date(dateFromReq).setHours(2, 59, 59, 999)).setDate(
			getDate - 30,
		),
	).toISOString();

	const sendResponse = products => {
		res.json({
			status: 'success',
			graphData: products,
		});
	};

	const sendError = err => {
		res.json({
			status: 'error',
			message: err.message,
		});
	};

	const setResp = products => {
		const resp = {
			labels: [],
			eatedProducts: [],
			dailyRate: [],
		};

		for (let i = 0; i < 30; i += 1) {
			const startDay = new Date(dateFromReq).getDate();
			const date = new Date(dateFromReq).setDate(startDay - i);
			const newDate = new Date(date).toLocaleDateString('en-US', {
				day: '2-digit',
			});

			resp.labels.push(newDate);
			resp.eatedProducts.push(0);
			resp.dailyRate.push(0);
		}

		resp.labels = resp.labels.reverse();
		for (let i = 0; i < products.length; i += 1) {
			const prodDate = new Date(
				products[i].createdDate.setHours(3, 0, 0, 0),
			).toLocaleDateString('en-US', {
				day: '2-digit',
			});

			const labelIndex = resp.labels.indexOf(prodDate);
			resp.eatedProducts[labelIndex] += products[i].calories;

			if (products[i].dailyRate) {
				resp.dailyRate[labelIndex] = products[i].dailyRate;
			}
		}

		return resp;
	};

	UserEated.find(
		{
			userId,
			createdDate: {
				$gte: await dateToEndDay,
				$lte: await dateToStartDay,
			},
		},
		{
			basicCalories: 0,
			basicWeight: 0,
			groupBloodNotAllowed: 0,
			userId: 0,
			__v: 0,
			title: 0,
			_id: 0,
			weight: 0,
		},
	)
		.then(data => {
			const resp = setResp(data);
			sendResponse(resp);
		})
		.catch(sendError);
};

module.exports = getAchevement;
