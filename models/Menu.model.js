'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuSchema = new Schema({
  name: { type: String, required: true },
  dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }]
});

module.exports = mongoose.model('Menu', MenuSchema)