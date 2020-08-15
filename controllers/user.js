const model = require('../model/model');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/key');

signToken = (user) => {
	return JWT.sign(
		{
			iss: 'Lovish',
			sub: user.id,
			iat: new Date().getTime(),
			exp: new Date().setDate(new Date().getDate() + 1)
		},
		JWT_SECRET
	);
};

module.exports = {
	signUp: async (req, res, next) => {
		const { email, username, password, address, number, city } = req.body;

		const findUser = await model.findOne({ 'local.email': email });

		//if user exists return
		if (findUser) {
			return res.status(400).json({ msg: 'Email is already in use' });
		}

		const newUser = new model({
			method: 'local',
			local: {
				email,
				username,
				password,
				number,
				address,
				city
			}
		});

		await newUser.save();
		const token = signToken(newUser);
		res.status(200).json({ Token: token });
	},
	signIn: async (req, res, next) => {
		const token = signToken(req.user);
		console.log('Token -> ', token);
		console.log('req -> user ', req.user);

		res.status(200).json({ Token: token, user: req.user });
	},
	facebook: async (req, res, next) => {
		const token = signToken(req.user);
		res.status(200).json({ Token: token });
	},
	google: async (req, res, next) => {
		const token = signToken(req.user);
		res.status(200).json({ Token: token });
	},
	admin: async (req, res) => {
		const token = signToken(req.user);
		res.status(200).json({ Token: token });
	},
	secret: async (req, res) => {
		res.json({ secret: 'secret' });
	}
};
