const mongoose = require('mongoose');

const Advices = new mongoose.Schema({


  title: {
    type: String,
    default: ""
  },
  body: {
    type: String,
    default: ""
  }
  

});

module.exports = mongoose.model('Advice', Advices);