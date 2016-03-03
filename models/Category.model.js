'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CategorySchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
})

module.exports = mongoose.model('Category', CategorySchema)