const User = require('../models/User');
const { errObj } = require('../config/constants');

const me = async (req, res) => {
    try {
        let user = await User.find({});
        res.json({
            user
        })
    } catch(e) {
        res.json(errObj(e));
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

module.exports = {
    me,
    signup,
    deleteOne
}