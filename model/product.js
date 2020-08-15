const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	email: {
		type: String
	},
	name: {
		type: String
	},
	title: {
		type: String
	},
	img: {
		type: Array
	},
	price: {
		type: Number
	},
	info: {
		type: String
	},
	category: {
		type: String
	},
	incart: {
		type: Boolean
	},
	count: {
		type: Number
	},
	likes: {
		type: Number
	},
	stock: {
		type: Number
	},
	total: {
		type: Number
	}
});

const Product = mongoose.model('productdbs', ProductSchema);
module.exports = Product;
