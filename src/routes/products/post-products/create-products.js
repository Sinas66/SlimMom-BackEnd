const multer = require('multer');
const path = require('path');

const fs = require(`fs`);
const util = require('util');

const Ingredient = require(`../../../db/schemas/ingridients`);
const readXlsxFile = require('read-excel-file/node');

const exelTmpFolder = `tmp/Ingredients-exel`;
const exelFolder = `Ingredients-exel`;
const TMP_EXEL_FOLDER = path.join(
	__dirname,
	'../../../../private',
	exelTmpFolder,
);
const EXEL_FOLDER = path.join(__dirname, '../../../../private', exelFolder);

const renameFile = util.promisify(fs.rename);

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, TMP_EXEL_FOLDER);
	},
	filename(req, file, cb) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

// const createFolder = (...mass) => {
// 	mass.forEach(fileFolder => {
// 		if (!fs.existsSync(fileFolder)) {
// 			fs.mkdirSync(fileFolder);
// 			console.log(fileFolder, ' is created');
// 		}
// 	});
// };

const moveImage = async (fileObject, time) => {
	const fileNewName = String(`${time} ${fileObject.originalname}`);
	console.log(`new FileName: `, fileNewName);

	const PATH_TO_TMP_EXEL = path.join(TMP_EXEL_FOLDER, fileObject.originalname);
	const PATH_TO_REGULAR_EXEL = path.join(EXEL_FOLDER, fileNewName);

	try {
		await renameFile(PATH_TO_TMP_EXEL, PATH_TO_REGULAR_EXEL);
		return PATH_TO_REGULAR_EXEL;
	} catch (err) {
		return err;
	}
};

const saveInDB = filePath => {
	const schema = {
		Наименование: {
			prop: 'name',
			type: String,
		},
		Белков: {
			prop: 'protein',
			type: Number,
			required: true,
		},
		Жиров: {
			prop: 'fat',
			type: Number,
			required: true,
		},
		Углеводов: {
			prop: 'сarbohydrate',
			type: Number,
			required: true,
		},
		Калорийность: {
			prop: 'energy',
			type: Number,
			required: true,
		},
	};

	return readXlsxFile(fs.createReadStream(filePath), { schema })
		.then(({ rows, errors }) => {
			// console.log(`rows: `, rows);

			return Ingredient.insertMany(rows, {
				bypassDocumentValidation: true,
				ordered: false,
				rawResult: false,
			})
				.then(data => {
					const saved = data.map(el => {
						console.log(`this.name: `, this.name);

						const item = {
							// eslint-disable-next-line no-underscore-dangle
							id: el._id,
							name: el.name,
							protein: el.protein,
							fat: el.fat,
							сarbohydrate: el.сarbohydrate,
							energy: el.energy,
						};
						return item;
					});

					const respData = {
						savedData: saved,
						// savedRows: rows,
						dataWithError: errors,
					};
					return respData;
				})
				.catch(err => {
					return err;
				});
		})
		.catch(err => {
			return err;
		});
};

const createProducts = (req, res) => {
	const fileObject = req.file;
	const time = new Date().toLocaleString().replace(/:/g, `-`);

	const sendError = err => {
		res.status(404).json({ err });
	};

	const sendResp = data => {
		res.json({
			status: `success`,
			result: data,
		});
	};

	moveImage(fileObject, time)
		.then(saveInDB)
		.then(sendResp)
		.catch(sendError);
};

module.exports = [upload.single('file'), createProducts];
