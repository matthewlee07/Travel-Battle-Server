'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { Search } = require('./searchModels');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    Search.find()
        .then(results => res.json(results));
})

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['legs', 'passengers', 'from', 'to', 'date', 'flexible', 'class'];
    const missingField = requiredFields.find(field => !(field in req.body));

    if (missingField) {
        return res.status(422).json({
            code: 422,
            reason: 'ValidationError',
            message: 'Missing field',
            location: missingField
        });
    }

    Search.create(req.body)
        .then(search => {
            return res.status(201).json(search);
        })
        .catch(err => {
            if (err.reason === 'ValidationError') {
                return res.status(err.code).json(err);
            }
            res.status(500).json({ code: 500, message: 'Internal server error' });
        });

});

// router.delete()

module.exports = { router };