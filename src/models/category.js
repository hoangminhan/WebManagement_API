const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema({
  title: { type: String, default: ''}
})

module.exports = mongoose.model('category', Category)