const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductsSchema = new Schema(
	{
		title: {
			ua: {
				type: String
			},
			ru: {
				type: String
			}
		},
		calories: {
			type: Number
		},
		categories: {
			type: Array
		},
		weight: {
			type: Number,
			default: 100
		},
		groupBloodNotAllowed: {
			1: true,
			2: false,
			3: false,
			4: true
		}
		// groupBloodNotAllowed: [
		// 	{
		// 		groupBlood: 1,
		// 		allowed: false
		// 	},
		// 	{
		// 		groupBlood: 2,
		// 		allowed: false
		// 	},
		// ]
	},
	{
		timestamps: true,
	},
);


const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
