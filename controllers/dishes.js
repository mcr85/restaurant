'use strict'

const Dish = require('../models/Dish.model')
const Category = require('../models/Category.model')

module.exports = {
  getDishes,
  getDish,
  createDish,
  removeDish,
  updateDish,
  getDishCategories,
  getDishesByCategory,
  parseDishData
}

function getDishes(req, res) {
  Dish.find({}, function (err, result) {
    if (err) res.send(err)
    res.json(result)
  })
}

function getDish(req, res) {
  Dish.findOne({ _id: req.params.id }, function (err, result) {
    if (err) throw err
    res.json(result)
  })
}

function createDish(req, res) {
  Dish.create(parseDishData(req.body), function (err, result) {
    if (err) throw err
    if (result && result.length > 0) {
      console.log('Dish added', result)
      res.json(result)
    }
  })
}

function removeDish(req, res) {
  Dish.remove({ _id: req.params.id }, function (err, result) {
    if (err) throw err
    if (result) {
      console.log('Dish removed', result)
      res.json({ success: true })
    }
  })
}

function updateDish(req, res) {
  const dish = parseDishData(req.body);
  
  Dish.findOneAndUpdate({ _id: req.params.id }, dish, function (err, result) {
    if (err) throw err
    if (result && result.length > 0) {
      console.log('Dish updated')
      res.json(result)
    }
  })
}

function getDishCategories(req, res) {
  Category.find({}, function (err, result) {
    if (err) throw err
    res.json(result)
  })
}

function getDishesByCategory(req, res) {
  const category = req.params.category;

  Dish.find({ category_id: category }, function (err, result) {
    if (err) throw err
    res.json(result)
  })
}

function parseDishData(requestBody) {
  return {
    name: requestBody.name,
    category_id: requestBody.category_id,
    price: parseInt(requestBody.price, 10),
    ingredients: requestBody.ingredients
  }
}
