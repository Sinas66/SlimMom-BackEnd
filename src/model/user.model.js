const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret, tokenLifeTime } = require(`../config`);

const SECRET_KEY = process.env.SECRET_KEY_FOR_JWB || secret;

const UserSchema = new Schema(
	{
		userName: {
			type: String,
			index: true,
			unique: true,
			required: true,
			lowercase: true,
			trim: true,
			minlength: 5,
			maxlengrh: 16,
			validate: {
				validator: function(v) {
					return /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/g.test(v);
				},
			},
		},
		password: {
			type: String,
			required: true,
			minlength: 5,
			maxlengrh: 16,
		},
		userData: {
			type: Object,
			email: { type: String, lowercase: true, trim: true },
			age: {
				type: Number,
				min: 1,
				max: 99,
				maxlengrh: 2,
			},
			weight: {
				type: Number,
				min: 1,
				max: 199,
				maxlengrh: 3,
			},
			height: {
				type: Number,
				min: 1,
				max: 230,
			},
			currentWeight: {
				type: Number,
				min: 1,
				max: 199,
				maxlengrh: 3,
			},
			groupBlood: {
				type: Number,
				min: 1,
				max: 4,
			},
		},
		token: { type: String },
		eatsRecorded: { type: Array },
	},
	{
		timestamps: true,
	},
);

UserSchema.pre('findOneAndUpdate', function() {
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

UserSchema.pre('save', function() {
	return this.createNewToken();
});

UserSchema.methods.comparePassword = function comparePassword(pass) {
	return bcrypt.compare(pass, this.password);
};

UserSchema.methods.createNewToken = async function createNewToken() {
	const userId = this._id;
	const token = jwt.sign({ userId, createdDate: Date.now() }, SECRET_KEY, {
		expiresIn: tokenLifeTime,
		noTimestamp: true,
	});
	this.token = token;

	try {
		return {
			userName: this.userName,
			token: this.token,
		};
	} catch {
		return `something goes wrong ;(`;
	}
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
