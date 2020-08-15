const express = require('express');
const router = express.Router();
const Admin = require('../model/admindatabase');

router.post('/adminRegister', async (req, res, next) => {
	console.log('hello lovish');
	try {
		const { username, email, number } = req.body;

		const user = await Admin.findOne({ email: email });
		const findemail = await Admin.findOne({ username: username });

		if (user || findemail) {
			res.status(400).json();
		}

		const admin = new Admin({
			username,
			email,
			number
		});

		await admin.save();
		res.status(200).json();
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
