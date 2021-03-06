'use strict'

const WeekMenu = require('../models/WeekMenu.model')

module.exports = {
  getWeeklyMenus,
  getWeeklyMenu,
  createWeeklyMenu,
  updateWeeklyMenu,
  removeWeeklyMenu
}

function getWeeklyMenus(req, res) {
  WeekMenu.find({})
    .populate({
      path: 'menu_id',
      populate: {
        path: 'dishes',
        model: 'Dish'
      }
    })
    .exec(function (err, menus) {
      if (err) throw err;
      res.json(menus);
    })
}

function getWeeklyMenu(req, res) {
  // var day = parseInt(req.params.day);
  // if (day > 0 && day <= 7) {
  //   db.collection('week_menus').findOne({ day: day }, { _id: 0 }, function (err, weekMenu) {
  //     if (err) throw err;

  //     var id = weekMenu.menu_id;

  //     // TODO: DRY this, same code in menus.js, make controllers
  //     db.collection('menus').findById(id, function (err, menu) {
  //       if (err) throw err;

  //       var dishesIDs = menu.dishes.map(function (id) {
  //         return mongoskin.helper.toObjectID(id);
  //       });

  //       db.collection('dishes')
  //         .find({ _id: { $in: dishesIDs } })
  //         .toArray(function (err, dishes) {
  //           if (err) throw err;
  //           menu.dishes = dishes;
  //           res.json(menu);
  //         });
  //     });
  //   });
  // }
};

function createWeeklyMenu(req, res) {
  // if (req.body && req.body.day && req.body.menu_id && req.body.menu_name) {
  //   var weekMenu = {
  //     day: req.body.day,
  //     menu_id: req.body.menu_id,
  //     menu_name: req.body.menu_name
  //   };
  //   db.collection('week_menus').insert(weekMenu, function (err, result) {
  //     if (err) throw err;
  //     if (result && result.length > 0) {
  //       console.log('Week Menu added', result);
  //       res.json(result[0]);
  //     }
  //   });
  // } else {
  //   throw new Error('Wrong Week Menu data');
  // }
};

function updateWeeklyMenu(req, res) {
};

function removeWeeklyMenu(req, res) {
  // var day = parseInt(req.params.day);
  // if (day > 0 && day <= 7) {
  //   db.collection('week_menus').remove({ day: day }, function (err, result) {
  //     if (err) throw err;
  //     console.log('Week Menu removed', result);
  //     res.json({ success: true });
  //   });
  // }
};


