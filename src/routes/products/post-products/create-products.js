const path = require('path');
// const Ingredient = require(`../../../model/products.model`);
// const exelTmpFolder = `tmp/Ingredients-exel`;
const productsFile = path.join(__dirname, '../../../../uploads/bd_products.xlsx');

const createProducts = (req, res) => {
	// multer - читає файл і записує його у папку uploads
	// в req.file - беремо назву файлу
	
	const excelToJson = require('convert-excel-to-json');

	const result = excelToJson({
			sourceFile: productsFile,
			header:{
					rows: 2
			},
			sheets: ['База данных продуктов']
	});
	const getFiledArray = result['База данных продуктов'].map(product => ({
		title: {
			ru: product.A,
			ua: product.E,
		},
		calories: product.F,
		categories: [product.G],
		groupBloodNotAllowed: {
			1: `${product.H === 'НЕЛЬЗЯ'}`,
			2: `${product.I === 'НЕЛЬЗЯ'}`,
			3: `${product.J === 'НЕЛЬЗЯ'}`,
			4: `${product.K === 'НЕЛЬЗЯ'}`
		}
	}));
	console.log(result)
	res.json({ getFiledArray });

};

module.exports = createProducts;
