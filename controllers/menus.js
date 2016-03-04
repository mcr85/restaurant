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
  Menu.findOne({ _id: req.params.id })
    .populate('dishes')
    .exec(function (err, result) {
      if (err) throw err
      res.json(result)
    })
}

function createMenu(req, res) {
  // if (req.body && req.body.name || req.body.dishes.length > 0) {
  //   var menu = parseMenuData(req.body);
  //   Menu.insert(menu, function (err, result) {
  //     if (err) throw err;
  //     if (result && result.length > 0) {
  //       console.log('Menu added', result);
  //       res.json(result[0]);
  //     }
  //   });
  // } else {
  //   throw new Error('Wrong Menu data');
  // }
};

function removeMenu(req, res) {
  // Menu.removeById(req.params.id, function (err, result) {
  //   if (err) throw err;
  //   console.log('Menu removed', result);
  //   res.json({ success: true });
  // });
};

function updateMenu(req, res) {
  // if (req.body && req.body.name || req.body.dishes.length > 0) {
  //   var menu = parseMenuData(requestBody);
  //   Menu.updateById(req.params.id, menu, function (err, result) {
  //     if (err) throw err;
  //     if (result && result.length > 0) {
  //       console.log('Menu updated', result);
  //       res.json(result[0]);
  //     }
  //   });
  // } else {
  //   throw new Error('Wrong Menu data');
  // }
};

function parseMenuData(requestBody) {
  return {
    name: requestBody.name,
    dishes: requestBody.dishes
  };
}
