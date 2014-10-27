var express = require('express');
var mongoskin = require('mongoskin');
var router = express.Router();
var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

router.get('/', function(req, res) {
    db.collection('menus').find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
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

router.post('/', function(req, res) {
    var menu = {
        name: req.body.name,
        dishes: req.body.dishes
    };
    if (req.body && req.body.name || req.body.dishes.length > 0) {
        db.collection('menus').insert(menu, menu, function(err, result) {
            if (err) throw err;
            if (result) {
                console.log('Menu added', result);
                res.json(result);
            }
        });
    } else {
        throw new Error('Wrong Menu data');
    }
});

router.delete('/:id', function(req, res) {
    db.collection('menus').removeById(req.params.id, function(err, result) {
        if (err) throw err;
        console.log('Menu removed', result);
        res.json({ success: true });
    });
});

router.put('/:id', function(req, res) {
    var menu = {
        name: req.body.name,
        dishes: req.body.dishes
    };
    if (req.body && req.body.name || req.body.dishes.length > 0) {
        db.collection('menus').updateById(req.params.id, menu, function(err, result) {
            if (err) throw err;
            if (result) {
                console.log('Menu updated', result);
                res.json(result);
            }
        });
    } else {
        throw new Error('Wrong Menu data');
    }
});

module.exports = router;
