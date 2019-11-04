const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  UserId: {
    type: String,
    default: ''
  },

  Likes: {
    type: String,
    default: '0'
  },
  comments: {
    type: Array,
    default: []
  },
  PostText: {
    type: String,
    default: ''
  },
  PostUserName: {
    type: String,
    default: ''
  },
  userphoto:{
    type: String,
    default: 'https://i.imgur.com/B4lpk1h.png'
  },

  
  AddDate: {
    type: String,
    default: Date()
  }
});

module.exports = mongoose.model('Post', PostSchema);