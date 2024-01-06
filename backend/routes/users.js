const express = require('express');
const router = express.Router();

//controller
 const {loginUser, registerUser} = require('../controllers/usersController');


//login route
router.post('/login', loginUser);

//signup route
router.post('/register', registerUser);

module.exports = router;