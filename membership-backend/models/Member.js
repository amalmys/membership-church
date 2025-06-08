const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  age: Number,
  gender: String,
  phone: String,
  email: String,
  bloodGroup: String,
  occupation: String,
  address: String,
  fatherName: String,
  motherName: String,
  parentContact: String,
  homeParish: String
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
