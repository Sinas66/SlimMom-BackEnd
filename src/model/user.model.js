const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { secret } = require(`../config`);
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || secret
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME || `30d`


const { Schema } = mongoose;

const UserSchema = new Schema(
	{
		userName: {
			type: String,
			index: true,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
		},
		password: { type: String, required: true },
		userData: {
			type: Object,
			email: { type: String, lowercase: true, trim: true },
			age: {},
			weight: {
				type: Number,
				min: 1,
				max: 199,
			},
			height: {},
			currentWeight: {},
			groupBlood: {},
		},
		token: { type: String },
		eatsRecorded: { type: Array },
	},
	{
		timestamps: true,
	},
);

UserSchema.pre('findOneAndUpdate', function () {
	const update = this.getUpdate();
	if (update.__v != null) {
		delete update.__v;
	}
	const keys = ['$set', '$setOnInsert'];
	for (const key of keys) {
		if (update[key] != null && update[key].__v != null) {
			delete update[key].__v;
			if (Object.keys(update[key]).length === 0) {
				delete update[key];
			}
		}
	}
	update.$inc = update.$inc || {};
	update.$inc.__v = 1;
});



UserSchema.pre('save', function () {
	return this.createNewToken()
});


UserSchema.methods.comparePassword = function comparePassword(pass) {
	return bcrypt.compare(pass, this.password)
};


UserSchema.methods.createNewToken = async function createNewToken() {

	const userId = this._id
	const token = jwt.sign({ userId, createdDate: Date.now() }, SECRET, {
		expiresIn: TOKEN_LIFETIME,
		noTimestamp: true,
	});
	this.token = token

	try {
		return {
			userName: this.userName,
			token: this.token
		}
	}
	catch{
		return `something goes wrong ;(`
	}
};







const User = mongoose.model('User', UserSchema);

module.exports = User;
