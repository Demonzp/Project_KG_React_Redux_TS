const { Router } = require('express');
const { signin } = require('../controllers/signinController');

const router = Router();

router.post('/signin', signin);

module.exports = router;