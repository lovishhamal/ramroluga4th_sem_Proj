const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConfirmSchema = new Schema({
	name: {
		type: String
	},
	email: {
		type: String
	},
	address: {
		type: String
	},
	city: {
		type: String
	},
	number: {
		type: Number
	},
	product: {
		type: Array
	},
	total: {
		type: Number
	}
});

const Confirm = mongoose.model('confirmOrderdbs', ConfirmSchema);
module.exports = Confirm;
