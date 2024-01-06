const express = require('express'); // import express
const app = express(); // initialize express app
const mongoose = require('mongoose'); // import mongoose

require('dotenv').config(); // import dotenv

const listsRoutes = require('./routes/lists'); // import lists routes
const usersRoutes = require('./routes/users'); // import users routes

// connect to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => {
// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is running || Connected to MongoDB " , process.env.PORT);
});
})
.catch((err) => {
    console.log(err);
})

// middleware
app.use(express.json()); // use express json

// routes
app.use('/api/lists', listsRoutes); // use lists routes
app.use('/api/users', usersRoutes); // use users routes
