const mongoose = require('mongoose');

const { Schema } = mongoose;
const timestamp = require('../middleware/timestamp');

const userSchema = new Schema(
	{
		userName: {
			type: String,
			//   unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
		password: { type: String, required: true },
		userData: {
			type: Object,
			email: { type: String },
		},
		token: { type: String },
		eatsRecorded: { type: Array },
	},
	{
		timestamps: true,
	},
);

userSchema.plugin(timestamp);
mongoose.set('useFindAndModify', false);
const User = mongoose.model('User', userSchema);

module.exports = User;
