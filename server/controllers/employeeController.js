// const passportMdw = require('../middleware/passport');

const { Employee } = require('../models/Employee');

const employeeGetAll = async (req, res) => {
    try {
        const result = await Employee.paginate({}, {
            page: parseInt(req.query.page, 10) || 1,
            limit: parseInt(req.query.limit, 10) || 10,
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

const employeeGetOne = async (req, res) => {
    try {
        const result = await Employee.find({ _id: req.params.id });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

const employeePost = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.json(newEmployee);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

const employeePut = async (req, res) => {
    try {
        const updEmployee = await Employee.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(updEmployee);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

const employeeDelete = async (req, res) => {
    try {
        const delEmployee = await Employee.deleteOne({ _id: req.params.id });
        res.json(delEmployee);
    } catch (err) {
        console.error(err);
        res.json({ message: err.message });
    };
};

module.exports = {
    employeeGetAll,
    employeeGetOne,
    employeePost,
    employeePut,
    employeeDelete,
};