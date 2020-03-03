const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('../authenticate');
const multer = require('multer');
const uploadRouter = express.Router();

const storage = multer({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can only upload images!!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
uploadRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation not supported on /dishes');
    })
    .post(authenticate.verifyUser, upload.single('imageFile'), (req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('Delete operation not supported on /dishes');
    });



module.exports = uploadRouter;