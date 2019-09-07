const mongoose      = require('mongoose');
const Schema        = mongoose.Schema;
const db            = require('../config/db');

let user_schema = new Schema(
    {
        id : { type : Number, required : true, index : true },
        employee_name : { type : String },
        employee_salary : { type : Number , required : true },
        employee_age : { type : Number, required : true },
        profile_image : { type : String, default : "" },
        active: { type: Boolean, default: true }
    },
    {
        timestamps : true,
        strict     : false
    }
);

user_schema.index({id: 1}, {unique: true});

module.exports = db.model('users', user_schema);