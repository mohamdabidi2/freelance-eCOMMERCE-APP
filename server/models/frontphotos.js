const mongoose = require('mongoose');

const FrontPhotos = new mongoose.Schema({


  img: {
    type: String,
    default: ""
  }
  

});

module.exports = mongoose.model('Photo', FrontPhotos);