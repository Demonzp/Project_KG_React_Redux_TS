const bcrypt = require('bcryptjs');
const { User } = require('../models/User');

// REGISTER new user in DB.
const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            login: req.body.login,
            email: req.body.email,
            password: hashedPassword,
        });

        if (user) {
            console.log(user);
            res.status(201).json({ message: 'Registration completed successfully!', user });
        };
    } catch (err) {
        console.error(err);
        res.status(409).json('User with this email already exists.');
    };
};

module.exports = { 
    signup, 
};