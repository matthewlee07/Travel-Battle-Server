'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const searchSchema = mongoose.Schema({
    legs: { type: String, required: true },
    passengers: { type: Number, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, required: true },
    flexible: { type: Boolean, required: true },
    class: { type: String, required: true },
});

const Search = mongoose.model('Search', searchSchema);

module.exports = { Search };