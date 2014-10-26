var express = require('express');
var mongoskin = require('mongoskin');
var router = express.Router();
var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

var weeklyPlan = [
    { id: "pon", dishes: [] },
    { id: "wt", dishes: [] },
    { id: "sr", dishes: [] },
    { id: "czw", dishes: [] },
    { id: "pia", dishes: [] },
    { id: "sob", dishes: [] },
    { id: "nie", dishes: [] }
];

var menus = { menus: [
    { name: "Menu na Poniedziałek", dishes: [
        "543ecb74dae3a1ef710f2752",
        "543ecb74dae3a1ef710f2753",
        "543ecb74dae3a1ef710f2754",
        "543ecb74dae3a1ef710f2755"
    ] },
    { name: "Menu na Wtorek", dishes: [] },
    { name: "Menu na Środę", dishes: [] },
    { name: "Menu na Czwartek", dishes: [] },
    { name: "Menu na Piątek", dishes: [] },
    { name: "Menu na Sobotę", dishes: [] },
    { name: "Menu na Niedzielę", dishes: [] }
]};


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
    db.collection('menus').insert(menu, function(err, result) {
        if (err) throw err;
        if (result) {
            console.log('Menu added', result);
            res.json(result);
        }
    });
});

router.delete('/:id', function(req, res) {
    db.collection('menus').removeById(req.params.id, function(err, result) {
        if (err) throw err;
        console.log('Menu removed', result);
        res.json({ success: true });
    });
});

router.put('/:id', function(req, res) {
    db.collection('menus').updateById(req.params.id, function(err, result) {
        if (err) throw er;
    });
});

module.exports = router;
