const { Router } = require('express');
const { signup } = require('../controllers/signupController');

const router = Router();

router.post('/signup', signup);

module.exports = router;