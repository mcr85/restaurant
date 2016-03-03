'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DishSchema = new Schema({
  name: { type: String, required: true },
  category_id: String,
  price: Number,
  ingredients: [{ name: String }]
});

module.exports = mongoose.model('Dish', DishSchema)