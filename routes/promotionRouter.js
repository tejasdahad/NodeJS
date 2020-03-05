const bodyParser = require('body-parser');
const express = require('express');
const promotionRouter = express.Router();
const authenticate = require('../authenticate');
const Promotions = require('../models/promotions');
const mongoose = require('mongoose');
const cors = require('cors');

promotionRouter.use(bodyParser.json());
promotionRouter.route('/')
	.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
	.get(cors.cors, (req, res, next) => {
		Promotions.find({})
			.then((promotions) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotions);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
		Promotions.create(req.body)
			.then((promotion) => {
				console.log('Promotion added ', promotion);
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotion);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.put(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
		res.statusCode = 403;
		res.end('Cannot allow put request in promotions');
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
		Promotions.remove({})
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			}, (err) => next(err))
			.catch((err) => next(err));
	});

promotionRouter.route('/:promotionId')
	.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
	.get(cors.cors, (req, res, next) => {
		Promotions.findById(req.params.promotionId)
			.then((promotion) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotion);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
		res.statusCode = 403;
		res.end('POST request not allowed in promotions');
	})
	.put(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
		Promotions.findByIdAndUpdate(req.params.promotionId, {
			$set: req.body
		}, { new: true })
			.then((promotion) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotion);
			}, (err) => next(err))
			.catch((err) => next(err));
	})
	.delete(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
		Promotions.findByIdAndRemove(req.params.promotionId)
			.then((resp) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(resp);
			}, (err) => next(err))
			.catch((err) => next(err));
	});

module.exports = promotionRouter;