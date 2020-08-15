const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');

const UserController = require('../controllers/user');

router.route('/signup').post(UserController.signUp);

router.route('/signin').post(passport.authenticate('local', { session: false }), UserController.signIn);

router
	.route('/facebookOauth')
	.post(passport.authenticate('facebookToken', { session: false }), UserController.facebook);

router.route('/googleOauth').post(passport.authenticate('googleToken', { session: false }), UserController.google);

router.route('/adminsignin').post(passport.authenticate('localadmin', { session: false }), UserController.admin);

router.route('/secret').get(passport.authenticate('jwt', { session: false }), UserController.secret);

router.route('/admin').get(passport.authenticate('adminjwt', { session: false }), UserController.secret);

module.exports = router;
