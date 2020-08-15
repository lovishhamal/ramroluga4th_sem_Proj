const express = require('express');
const router = express.Router();
const multer = require('multer');

const nodemailer = require('nodemailer');
const DIR = './client/public/products';
const Product = require('../model/product');
const Confirm = require('../model/productconfirm');

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

router.post('/confirmorder', async (req, res, next) => {
	const { name } = req.body;
	const { email } = req.body;
	const { address } = req.body;
	const { city } = req.body;
	const { number } = req.body;
	const { data } = req.body;
	const { total } = req.body;
	let dataarray = [];
	dataarray = data;

	for (var i = 0; i < dataarray.length; i++) {
		let loopdata = dataarray[i];
		let id = loopdata._id;
		let newstock = loopdata.stock - loopdata.count;
		const resdata = await Product.findOneAndUpdate({ _id: id }, { stock: newstock }, { new: true });
	}

	const confirm = new Confirm({
		name,
		email,
		address,
		city,
		number,
		product: data,
		total
	});
	confirm.save();
});

/*
router.post('/updatelike', async (req, res, next) => {
	const { id, count } = req.body;
	console.log('id -> ', id);
	console.log('count -> ', count);

	try {
		await Product.findById(id).updateOne({}, { likes: count + 1 });
	} catch (error) {
		res.status(400);
	}
});
*/

let getemail;
router.post('/getemail', (req, res, next) => {
	const { email } = req.body;
	getemail = email;
});
router.post('/upload', upload.array('file', 100), (req, res, next) => {
	const { value } = req.body;
	const { title } = req.body;
	const { price } = req.body;
	const { info } = req.body;
	const { category } = req.body;
	const { stock } = req.body;
	const { email } = req.body;

	if (req.files.length == 0) {
		return;
	}

	let reqfiles = '';
	for (var i = 0; i < req.files.length; i++) {
		reqfiles = '/products/' + req.files[i].filename;
	}

	Product.countDocuments((err, length) => {
		const product = new Product({
			email: email,
			name: value,
			title: title,
			img: reqfiles,
			price: price,
			info: info,
			category: category,
			incart: false,
			likes: 0,
			stock: stock,
			count: 0,
			total: 0
		});
		product.save();
	});
});

router.get('/getproduct', (req, res, next) => {
	Product.find().then((data) => {
		res.status(200).json(data);
	});
});

router.delete('/delete/:id', (req, res, next) => {
	console.log('image product delete');
	Product.findById(req.params.id).then((data) => {
		data.delete();
	});
});

module.exports = router;
