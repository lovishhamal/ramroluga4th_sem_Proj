const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const GoogleOauthStrategy = require('passport-google-plus-token');
const FacebookOauthStrategy = require('passport-facebook-token');

const Model = require('./model/model');
const config = require('./config/key');
const Admin = require('./model/admindatabase');

passport.use(
	'adminjwt',
	new JWTstrategy(
		{
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
			secretOrKey: config.JWT_SECRET
		},
		async (payload, done) => {
			try {
				//find user
				const findAdmin = await Admin.findById(payload.sub);

				//return if user not find
				if (!findAdmin) {
					return done(null, false);
				}
				//if found process
				done(null, findAdmin);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

passport.use(
	new JWTstrategy(
		{
			jwtFromRequest: ExtractJwt.fromHeader('authorization'),
			secretOrKey: config.JWT_SECRET
		},
		async (payload, done) => {
			try {
				//find user in database
				const findUser = await Model.findById(payload.sub);
				//if user doesnot exists takecare
				if (!findUser) {
					return done(null, false);
				}
				//otherwise return the user
				done(null, findUser);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

//facebook Oauth
passport.use(
	'facebookToken',
	new FacebookOauthStrategy(
		{
			clientID: config.oauth.facebook.clientId,
			clientSecret: config.oauth.facebook.clientSecret
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const existingUser = await Model.findOne({ 'facebook.id': profile.id });
				if (existingUser) {
					return done(null, existingUser);
				}

				const newUser = new Model({
					method: 'facebook',
					facebook: {
						id: profile.id,
						email: profile.emails[0].value
					}
				});

				await newUser.save();
			} catch (error) {
				done(error, false);
			}
		}
	)
);

//google oauth
passport.use(
	'googleToken',
	new GoogleOauthStrategy(
		{
			clientID: config.oauth.google.clientId,
			clientSecret: config.oauth.google.clientSecret
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const existingUser = await Model.findOne({ 'google.id': profile.id });
				if (existingUser) {
					return done(null, existingUser);
				}

				const newuser = new Model({
					method: 'google',
					google: {
						id: profile.id,
						email: profile.emails[0].vlaue
					}
				});
				await newuser.save();
				done(null, newuser);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

//local strategy for retriving email
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		async (email, password, done) => {
			try {
				const findUser = await Model.findOne({ 'local.email': email });
				if (!findUser) {
					return done(null, false);
				}
				const isMatch = await findUser.verifyPassword(password);
				if (!isMatch) {
					return done(null, false);
				}
				return done(null, findUser);
			} catch (error) {
				done(error, false);
			}
		}
	)
);

passport.use(
	'localadmin',
	new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
		try {
			const finduser = await Admin.findOne({ email: email });

			if (finduser && password == 123456) {
				return done(null, finduser);
			}
			return done(null, false);
		} catch (error) {
			done(error, false);
		}
	})
);
