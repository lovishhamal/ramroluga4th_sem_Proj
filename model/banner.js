const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
	image: {
		type: Array
	}
});

const Banner = mongoose.model('bannerdbs', BannerSchema);
module.exports = Banner;
