const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({


  firstName: {
    type: String,
    default: ''
  },

  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  password:{
    type: String,
    default: ""
  }

  

});

module.exports = mongoose.model('Admin', AdminSchema);