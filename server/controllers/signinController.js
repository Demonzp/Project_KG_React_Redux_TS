const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

// AUTHORIZATION of registered user in the application.
const signin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) {
        res.status(401).json({ message: 'Such user doesn\'t exist! Please registrate yourself!' });
        return;
    };

    const jwtLifespan = '1h';

    const jwtPayload = {
        sub: user._id,
        iat: Date.now(),
    };

    try {
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            res.status(401).json({ message: 'Invalid credentials!' });
        } else {
            const token = jwt.sign(jwtPayload, process.env.ACCESS_SECRET_KEY, { expiresIn: jwtLifespan, algorithm: 'HS256' });
            console.log({ signedToken: token, expiresIn: jwtLifespan });
            res.json({ signedToken: token, expiresIn: jwtLifespan });
        };
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    };
};

module.exports = { 
    signin, 
};