const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// A function for rounding the employee's salary value entered by the user to the nearest hundredth.
function salarySet(value) {
    return (Number((value * 1).toFixed(2)));
};

const EmployeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        sex: {
            type: String,
            required: true,
            trim: true,
        },

        birthday: {
            type: String,
            required: true,
            trim: true,
        },

        contacts: {
            type: String,
            required: true,
            trim: true,
        },

        position: {
            type: String,
            required: true,
            trim: true,
        },

        salary: {
            type: Number,
            set: salarySet,
            required: true,
        },
    },

    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: true },
    },
);

EmployeeSchema.plugin(mongoosePaginate);

module.exports.Employee = mongoose.model('Employee', EmployeeSchema);