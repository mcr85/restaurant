'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WeekMenuSchema = new Schema({
  name: { type: String, required: true },
  day: { type: Number, required: true },
  menu_id: { type: Schema.Types.ObjectId, ref: 'Menu' },
  menu_name: String
}, { collection: 'week_menus' })

module.exports = mongoose.model('WeekMenu', WeekMenuSchema)