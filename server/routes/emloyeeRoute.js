const { Router } = require('express');
const { employeeGetAll, employeeGetOne, employeePost, employeePut, employeeDelete } = require('../controllers/employeeController');

const router = Router();

router.get('/employees/', employeeGetAll);
router.get('/employees/:id', employeeGetOne);
router.post('/employees/', employeePost);
router.put('/employees/:id', employeePut);
router.delete('/employees/:id', employeeDelete);

module.exports = router;