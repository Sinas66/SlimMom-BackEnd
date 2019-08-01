// const multer = require('multer');
// const path = require('path');
// eslint-disable-next-line node/prefer-global/buffer
const fs = require(`fs`);
// const util = require('util');


// const Ingredient = require(`../../../model/products.model`);
const readXlsxFile = require('read-excel-file/node');

// const exelTmpFolder = `tmp/Ingredients-exel`;
// const exelFolder = `Ingredients-exel`;
// const TMP_EXEL_FOLDER = path.join(
// 	__dirname,
// 	'../../../../private',
// 	exelTmpFolder,
// );
// const EXEL_FOLDER = path.join(__dirname, '../../../../private', exelFolder);

// const renameFile = util.promisify(fs.rename);

// const storage = multer.diskStorage({
// 	destination(req, file, cb) {
// 		cb(null, TMP_EXEL_FOLDER);
// 	},
// 	filename(req, file, cb) {
// 		cb(null, file.originalname);
// 	},
// });

const saveInDB = () => {
	const schema = {
		Название: {
			prop: 'ru',
			type: String,
		},
		Назва: {
			prop: 'ua',
			type: String,
		},
		'Кал, ккал': {
			prop: 'calories',
			type: Number,
		},
		'Категория продуктов': {
			prop: 'categories',
			type: String,
		},
	};

	return readXlsxFile(fs.createReadStream('./uploads/bd_products.xlsx'), { schema })
		.then(({ rows, errors }) => {
			console.log({ rows, errors });

			// return Ingredient.insertMany(rows, {
			// 	bypassDocumentValidation: true,
			// 	ordered: false,
			// 	rawResult: false,
			// })
			// 	.then(data => {
			// 		const saved = data.map(el => {
			// 			console.log(`this.name: `, this.name);

			// 			const item = {
			// 				// eslint-disable-next-line no-underscore-dangle
			// 				id: el._id,
			// 				name: el.name,
			// 				protein: el.protein,
			// 				fat: el.fat,
			// 				сarbohydrate: el.сarbohydrate,
			// 				energy: el.energy,
			// 			};
			// 			return item;
			// 		});

			// 		const respData = {
			// 			savedData: saved,
			// 			// savedRows: rows,
			// 			dataWithError: errors,
			// 		};
			// 		return respData;
			// 	})
			// 	.catch(err => {
			// 		return err;
			// 	});
		})
		.catch(err => {
			return err;
		});
};

const createProducts = (req, res) => {
	const fileObject = req.file;

	console.log(fileObject);
	res.json({ ggog: 'googo' });
	// const time = new Date().toLocaleString().replace(/:/g, `-`);

	// const sendError = err => {
	// 	res.status(404).json({ err });
	// };

	// const sendResp = data => {
	// 	res.json({
	// 		status: `success`,
	// 		result: data,
	// 	});
	// };

	saveInDB();
	// .then(saveInDB(fileObject))
	// .then(sendResp)
	// .catch(sendError);
};

module.exports = createProducts;
