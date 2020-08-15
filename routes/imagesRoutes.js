const express = require('express');
const router = express.Router();
const multer = require('multer');

const Image = require('../model/imageslider');
const Banner = require('../model/banner');

const DIR = './client/public/images';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, DIR);
	},
	filename: (req, file, cb) => {
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, fileName);
	}
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
			cb(null, true);
		} else {
			cb(null, false);
			return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
		}
	}
});

/*
router.post('/designer', (req, res) => {
	const { value } = req.body;

	const image = new Image({
		name: value
	});

	image.save();
});
*/

router.get('/getbanner', (req, res, next) => {
	Banner.find().then((data) => {
		res.status(200).json(data);
	});
});

router.delete('/deletebanner/:id', (req, res) => {
	Banner.findById(req.params.id).then((data) => {
		data.delete();
	});
});
router.post('/uploadbanner', upload.array('file', 6), (req, res, next) => {
	if (req.files.length == 0) {
		return;
	}

	let reqFiles = '';
	for (var i = 0; i < req.files.length; i++) {
		reqFiles = '/images/' + req.files[i].filename;
	}

	const banner = new Banner({
		image: reqFiles
	});
	banner.save();
});

router.post('/upload', upload.array('file', 6), (req, res, next) => {
	console.log('req -> body', req);

	const { value } = req.body;

	if (req.files.length == 0) {
		return;
	}

	let reqFiles = '';
	for (var i = 0; i < req.files.length; i++) {
		reqFiles = '/images/' + req.files[i].filename;
	}

	Image.countDocuments((err, length) => {
		const image = new Image({
			index: length,
			imgCollection: reqFiles,
			field: 'images',
			name: value
		});

		image.save();
	});
});

/*
router.get('/designers', (req, res) => {
	Designer.find().then((data) => {
		res.status(200).json(data);
	});
});
*/
router.get('/', (req, res, next) => {
	Image.find().then((data) => {
		res.status(200).json(data);
	});
});

router.get('/getimg/:id', (req, res) => {
	Image.findById(req.params.id).then((data) => {
		res.status(200).json(data);
	});
});

router.delete('/delete/:id', (req, res) => {
	Image.findById(req.params.id).then((data) => {
		data.delete();
	});
});

module.exports = router;
