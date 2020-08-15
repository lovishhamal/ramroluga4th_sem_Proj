const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	method: {
		type: String,
		enum: [ 'local', 'google', 'facebook' ],
		required: true
	},
	local: {
		email: {
			type: String,
			lowercase: true
		},
		username: {
			type: String,
			require: true,
			index: true
		},
		password: {
			type: String
		},
		number: {
			type: Number
		},
		address: {
			type: String
		},
		city: {
			type: String
		}
	},
	google: {
		id: {
			type: String
		},
		email: {
			type: String,
			lowercase: true
		},
		number: {
			type: Number
		},
		address: {
			type: String
		},
		city: {
			type: String
		}
	},
	facebook: {
		id: {
			type: String
		},
		email: {
			type: String,
			lowercase: true
		},
		number: {
			type: Number
		},
		address: {
			type: String
		},
		city: {
			type: String
		}
	}
});

//hash password
userSchema.pre('save', async function(next) {
	try {
		if (this.method != 'local') {
			next();
		}
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(this.local.password, salt);
		this.local.password = hashPassword;
		next();
	} catch (err) {
		next(err);
	}
});

//decrypt password
userSchema.methods.verifyPassword = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.local.password);
	} catch (error) {
		throw new Error(error);
	}
};

module.exports = User = mongoose.model('Userdbs', userSchema);
