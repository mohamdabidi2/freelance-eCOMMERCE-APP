const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  UserId: {
    type: String,
    default: ''
  },
 ProductImg:{
    type: String,
    default: ''
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  userName: {
    type: String,
    default: ''
  },
  phone: {
    type: Number,
    default: null
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Product', ProductSchema);