const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');

// @router POST api/users
// @desc   Register users
// @access Public
router.post('/', (req, res) => {
    // Deconstructuring
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Fill up fields'})
    }

    // Check existing user
    User.findOne({ email: email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Meron na tanga'});

            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 10 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token: token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    })
                                }
                            )                  
                        });
                })
            })
        })
}); 

// @router GET api/users
// @desc   Get all users
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .then(users => res.json(users))
}); 


module.exports = router;