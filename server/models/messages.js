const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    default: ''
  },

  recevedId: {
    type: String,
    default: ''
  },
  messages: {
    type: Array,
    default: []
  }
  

  

});

module.exports = mongoose.model('Message', MessageSchema);