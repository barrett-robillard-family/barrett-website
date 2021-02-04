const { members } = require('../config/data');
const User = require('../models/User');
const express = require('express');
const { errObj } = require('../config/constants');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('=============== Seeding DB =============');
        let deleted = await User.deleteMany({});
        console.log('Deleted: ', deleted);

        let savedMembers = [];
        let failedMembers = [];
        let formattedMembers = members.map(m => ({
            firstName: m.firstName,
            lastName: m.lastName,
            email: m.firstName+m.lastName.substr(0,1).toUpperCase()+m.lastName.substr(1)+'@gmail.com',
            pwd: m.firstName
        }));
        let promises = formattedMembers.map( member => new Promise((resolve, reject) => {
            let newUser = new User(member);
            newUser.save().then(done => {
                savedMembers.push(done);
                resolve();
            }).catch(e => {
                failedMembers.push(e);
            })
        }));
        await Promise.all(promises);
        
        console.log('Success Count: ', savedMembers.length);
        console.log('Failed Count: ', failedMembers.length);
        res.json({
            success: true,
            msg: 'Database seeded..',
            data: {
                savedMembers,
                failedMembers
            }
        })
    } catch(e) {
        res.json(errObj(e));
    }
})

module.exports = router;