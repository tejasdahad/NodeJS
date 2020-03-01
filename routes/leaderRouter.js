const bodyParser = require('body-parser');
const express = require('express');
const leaderRouter = express.Router();
const authenticate = require('../authenticate');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');

leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
	.get((req, res, next) => {
		Leaders.find({})
			.then((leaders) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(leaders);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser,(req, res, next) => {
		Leaders.create(req.body)
			.then((leader) => {
				console.log('Promotion added ', leader);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(leader);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.put(authenticate.verifyUser,(req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot allow put request in leader');
	})
	.delete(authenticate.verifyUser,(req, res, next) => {
		Leaders.remove({})
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			}, (err) => next(err))
			.catch((err) => next(err));
	});

leaderRouter.route('/:leaderId')
	.get((req, res, next) => {
		Leader.findById(req.params.leaderId)
			.then((leader) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(leader);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post(authenticate.verifyUser,(req, res, next) => {
		res.statusCode = 403;
		res.end('POST request not allowed in leaders ');
	})
	.put(authenticate.verifyUser,(req, res, next) => {
		Leaders.findByIdAndUpdate(req.params.leaderId, {
			$set: req.body
		}, { new: true })
			.then((leader) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(leader);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.delete(authenticate.verifyUser,(req, res, next) => {
		Leaders.findByIdAndRemove(req.params.leaderId)
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			}, (err) => next(err))
			.catch((err) => next(err));
	});

module.exports = leaderRouter;