const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  UserId: {
    type: String,
    default: ''
  },

  ProductDescription: {
    type: String,
    default: ''
  },
  qte: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  photo:{
    type: String,
    default: ''
  },
  prix:{
    type: String,
    default: ''
  },

  ProductName:{
    type: String,
    default: ''
  },
  
  AddDate: {
    type: String,
    default: Date()
  }
});

module.exports = mongoose.model('Product', ProductSchema);