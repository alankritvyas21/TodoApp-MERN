const mongoose = require('mongoose'); // import mongoose

const Schema = mongoose.Schema; // initialize mongoose schema

// create list schema
const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('TodoList', listSchema); // export list model
