const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* 
    Image Schema for storing images in the 
    mongodb database
*/
const ImageSchema = new Schema({
	index: {
		type: Number
	},
	imgCollection: {
		type: Array
	},
	field: {
		type: String
	},
	name: {
		type: String
	}
});

const Image = mongoose.model('imageDb', ImageSchema);
module.exports = Image;
