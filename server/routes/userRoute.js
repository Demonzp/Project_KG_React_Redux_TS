const { Router } = require('express');
const { userGet } = require('../controllers/userController');

const router = Router();

router.get('/user', userGet);

module.exports = router;