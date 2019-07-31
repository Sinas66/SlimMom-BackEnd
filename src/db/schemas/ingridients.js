const mongoose = require('mongoose');

const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const ingridientsSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		protein: { type: Number, required: true },
		fat: { type: Number, required: true },
		сarbohydrate: { type: Number, required: true },
		energy: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

ingridientsSchema.plugin(timestamp);
mongoose.set('useFindAndModify', false);
const Ingredient = mongoose.model('Ingredient', ingridientsSchema);

module.exports = Ingredient;
