const User = require('../models/usersmodel'); // import model
const jwt = require('jsonwebtoken'); // import jwt

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1h'})
}

//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    
    try{
        const user = await User.login(email, password);

        //create a token 
        const token = createToken(user._id);

        res.status(200).json({email , token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//signup user
const registerUser = async (req, res) => {
    const {name, username, email, password} = req.body;

    try {
        const user = await User.register(name, username, email, password);

        //create a token 
        const token = createToken(user._id);

        res.status(200).json({email , username , token});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    loginUser,
    registerUser
} 