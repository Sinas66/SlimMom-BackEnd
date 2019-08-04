const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserEatedSchema = new Schema(
	{
		title: {
			ua: {
				type: String,
			},
			ru: {
				type: String,
			},
		},
		basicCalories: {
			type: Number,
		},
		basicWeight: {
			type: Number,
			default: 100,
		},
		calories: {
			type: Number,
			default: (this.basicCalories * this.weight) / 100,
		},
		weight: {
			type: Number,
		},
		groupBloodNotAllowed: {
			type: Object,
			1: true,
			2: false,
			3: false,
			4: true,
		},
	},
	{
		timestamps: true,
	},
);

const UserEated = mongoose.model('User', UserEatedSchema);

module.exports = UserEated;
