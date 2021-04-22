const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validate = require('mongoose-validator');


const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [3, 50],
    message: 'should be between {ARGS[0]} and {ARGS[1]} characters'
  })
];



const recordSchema = new Schema({
  value: {
    type: String,
    required: true,
    validate: nameValidator
  }
}, {

});


module.exports = mongoose.model('Record', recordSchema)
