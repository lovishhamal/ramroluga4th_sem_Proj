const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
	username: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		required: true
	},
	number: {
		type: Number
	}
});

const Admin = mongoose.model('admindb', AdminSchema);
module.exports = Admin;
