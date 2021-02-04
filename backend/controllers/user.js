const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { errObj } = require('../config/constants');

const { JWT_TOKEN } = process.env;

const me = async (req, res) => {
    if (req.error) return res.status(500).json(errObj(req.error));
    if (!req.user) return res.status(403).json({
        success: false,
        msg: 'Invalid Session. Try loggin back in',
        data: {},
    })
    try {
        let user = await User.findById(req.user._id).lean();
        delete user.pwd;
        res.json({
            user
        })
    } catch(e) {
        res.json(errObj(e));
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({email: req.body.email}).lean();

        // email not found
        if (!user) return res.status(401).json({
            success: false,
            msg: 'Email not found',
            data: {}
        })

        // incorrect pwd
        let passwordsMatch = user.pwd === req.body.pwd;
        if (!passwordsMatch) return res.status(401).json({
            success: false,
            msg: 'Incorrect Password',
            data: {},
        })

        // authenticated
        delete user.pwd;
        let token = jwt.sign(user, JWT_TOKEN);
        res.json({
            success: true,
            msg: 'Welome!',
            data: { token },
        })

    } catch(e) {
        res.status(500).json(errObj(e));
    }
}

const signup = async (req, res) => {
    let newUser = new User(req.body);
    try {
        let user = await newUser.save();
        res.json({
            success: true,
            msg: 'Thanks for joining!',
            data: {
                newUser
            }
        })
    } catch(e) {
        res.json(errObj(e));
    }
}

const deleteOne = async (req, res) => {
    try {
        let deleted = await User.findByIdAndDelete(req.params.id);
        res.json({
            success: true,
            msg: 'Successfuly Deleted',
            data: {
                deleted
            }
        })
    } catch(e) {
        res.json(errObj(e));
    }
}

const all = async (req, res) => {
    if (req.error) res.status(500).json(errObj(req.error));
    if (!req.admin) res.status(403).json({
        success: false,
        msg: 'Access Denied',
        data: {},
    })
    try {
        let users = await User.find({});
        let total = users.length;
        console.log('USERS FOUND: ', total)
        res.json({
            success: true,
            msg: ':D',
            data: {
                total: users.length,
                users,
            }
        })
    } catch(e) {
        res.status(500).json(errObj(e));
    }
}

module.exports = {
    me,
    login,
    signup,
    deleteOne,
    all,
}