const { User } = require('../models/User');

const userGet = async (req, res) => {
    try {
        const result = await User.findOne({ _id: req.user._id });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

module.exports = {
    userGet,
};