'use strict'

const Menu = require('../models/Menu.model')

module.exports = {
  getMenus,
  getMenu,
  createMenu,
  removeMenu,
  updateMenu
}

function getMenus(req, res) {
  Menu.find({})
    .populate('dishes')
    .exec(function (err, result) {
      if (err) throw err
      res.json(result)
    })
}

function getMenu(req, res) {
  Menu.findById(req.params.id)
    .populate('dishes')
    .exec(function (err, result) {
      if (err) throw err
      res.json(result)
    })
}

function createMenu(req, res) {
  if (!req.body && (!req.body.name || req.body.length === 0)) {
    return res.status(400).send('Bad request. Missing Menu details.')
  }

  Menu.create(parseMenuData(req.body), function (err, result) {
    if (err) throw err;
    if (result && result.length > 0) {
      console.log('Menu added', result)
      res.json(result)
    }
  })
}

function removeMenu(req, res) {
  Menu.findByIdAndRemove(req.params.id, function (err, result) {
    if (err) throw err
    console.log('Menu removed', result);
    res.json({ success: true });
  })
}

function updateMenu(req, res) {
  if (!req.body && (!req.body.name || req.body.length === 0)) {
    return res.status(400).send('Bad request. Missing Menu details.')
  }

  const menu = parseMenuData(req.body)

  Menu.findByIdAndUpdate(req.params.id, menu, function (err, result) {
    if (err) throw err
    if (result && result.length > 0) {
      console.log('Menu updated')
      res.json(result)
    }
  })
}

function parseMenuData(requestBody) {
  return {
    name: requestBody.name,
    dishes: requestBody.dishes
  }
}
