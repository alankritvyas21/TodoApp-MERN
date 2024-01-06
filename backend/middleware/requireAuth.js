const jwt = require('jsonwebtoken');
const User = require('../models/usersmodel');

const requireAuth = async (req, res, next) => {
    //verify authentification
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(501).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1]; // Bearer token

    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: 'Invalid token' });
    }

};

module.exports = requireAuth;