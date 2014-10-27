var express = require('express');
var mongoskin = require('mongoskin');
var router = express.Router();
var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

router.get('/', function(req, res) {
    db.collection('week_menus').find().toArray(function(err, menus) {
        if (err) throw err;
        res.json(menus);
    });
});

router.get('/:day', function(req, res) {
    var day = parseInt(req.params.day);
    if (day > 0 && day <= 7) {
        db.collection('week_menus').findOne({ day: day }, function(err, weekMenu) {
            if (err) throw err;

            var id = weekMenu.menu_id;

            // TODO: DRY this, same code in menus.js, make controllers
            db.collection('menus').findById(id, function(err, menu) {
                if (err) throw err;

                var dishesIDs = menu.dishes.map(function(id) {
                    return mongoskin.helper.toObjectID(id);
                });

                db.collection('dishes')
                    .find( { _id: { $in : dishesIDs }})
                    .toArray(function(err, dishes) {
                        if (err) throw err;
                        menu.dishes = dishes;
                        res.json(menu);
                    });
            });
        });
    }
});

router.post('/', function(req, res) {
    if (req.body && req.body.day && req.body.menu_id && req.body.menu_name) {
        var weekMenu = {
            day: req.body.day,
            menu_id: req.body.menu_id,
            menu_name: req.body.menu_name
        };
        db.collection('week_menus').insert(weekMenu, function(err, result) {
            if (err) throw err;
            console.log('Week Menu added', result);
            res.json(result);
        });
    } else {
        throw new Error('Wrong Week Menu data');
    }
});

router.put('/:day', function(req, res) {
    // update menu for given day
    // can change menu id
});

router.delete('/:day', function(req, res) {
    var day = parseInt(req.params.day);
    if (day > 0 && day <= 7) {
        db.collection('week_menus').remove({ day: day }, function(err, result) {
            if (err) throw err;
            console.log('Week Menu removed', result);
            res.json({ success: true });
        });
    }
});

module.exports = router;
