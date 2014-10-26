var express = require('express');
var mongoskin = require('mongoskin');
var router = express.Router();
var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

var dishes = {dishes: [
    {
        name:  "Pene z kurczakiem",
        category_id: "lunch",
        price: 15.0,
        ingredients: [
            { name: "kurczak" },
            { name: "makaron" },
            { name: "ser" },
            { name: "zioła" }
        ]
    }, {
        name:  "Schabowy z ziemniakami i surówką",
        category_id: "lunch",
        price: 15.0,
        ingredients: [
            { name: "schab" },
            { name: "ziemniaki" },
            { name: "zestaw surówek" }
        ]
    }, {
        name:  "Pierogi z mięsem",
        category_id: "lunch",
        price: 12.0,
        ingredients: [
            { name: "mięso mielone" }
        ]
    }, {
        name: "Gulasz",
        category_id: "lunch",
        price: 15.0,
        ingredients: [
            { name: "mięso wołowe" },
            { name: "kasza gryczana" }
        ]
    }, { 
        name: "Karkówka z grila",
		category_id: "glowne",
		price: 18.0,
		ingredients: [
            { name: "mięso wieprzowe" },
            { name: "ziemniaki" },
            { name: "zestaw surówek" }
        ]
    }, {
        name: "Carbonara",
		category_id: "glowne",
		price: 20.0,
		ingredients: [
            { name: "makaron" },
            { name: "boczek" },
            { name: "ser" }
        ]
    }, {
        name: "Lasagne",
		category_id: "glowne",
		price: 18.0,
		ingredients: [
            { name: "makaron" },
            { name: "mięso mielone" },
            { name: "ser" },
            { name: "sos pomidorowy" }
        ]
    }, {
        name: "Kurczak w pięciu smakach",
		category_id: "glowne",
		price: 18.0,
		ingredients: [
            { name: "kurczak" },
            { name: "warzywa" },
            { name: "sos" }
        ]
    }, {
        name: "Gołąbki z kaszą gryczaną",
		category_id: "glowne",
		price: 18.0,
		ingredients: [
            { name: "kapusta" },
            { name: "ryż" },
            { name: "mięso mielone" },
            { name: "ziemniaki" }
        ]
    }, {
        name: "Naleśniki z serem i szpinakiem",
		category_id: "wegetarianskie",
		price: 18.0,
		ingredients: [
            { name: "ser twarogowy" },
            { name: "szpinak" },
            { name: "ser żółty" }
        ]
    }, {
        name: "Tatar z łososia",
		category_id: "wegetariańskie",
		price: 18.0,
		ingredients: [
            { name: "łosoś" },
            { name: "warzywa" }
        ]
    }, {
        name: "Krokiety z kapustą i grzybami",
		category_id: "wegetariańskie",
		price: 18.0,
		ingredients: [
            { name: "kapusta" },
            { name: "grzyby" }
        ]
    }, {
        name: "Ślepy śledź teściowej",
		category_id: "wegetariańskie",
		price: 18.0,
		ingredients: [
            { name: "ziemniaki" },
            { name: "cebula" },
            { name: "śmietana" }
        ]
    }, {
        name: "Rosół",
		category_id: "zupy",
		price: 4.00,
		ingredients: [
            { name: "makaron" }
        ]
    }, {
        name: "Ogórkowa",
		category_id: "zupy",
		price: 4.00,
		ingredients: [ 
            { name: "ziemniaki" }
        ]
    }, {
        name: "Grochowa",
		category_id: "zupy",
		price: 4.00,
		ingredients: [
            { name: "groch" },
            { name: "ziemniaki" }
        ]
    }, {
        name: "Pomidorowa",
		category_id: "zupy",
		price: 4.00,
		ingredients: [
            {name: "makaron" }
        ]
    }, {
        name: "Bruschetta",
		category_id: "przystawki",
		price: 6.00,
		ingredients: [
            { name: "chleb" }
        ]
    }, {
        name: "Chleb ze smalcem i ogórkiem kiszonym",
		category_id: "przystawki",
		price: 4.00,
		ingredients: [
            { name: "chleb" },
            { name: "smalec" },
            { name: "boczek" },
            { name: "ogórek kiszony" }
        ]
    }, {
        name: "Szarlotka",
		category_id: "desery",
		price: 8.00
    }, {
        name: "Lody",
		category_id: "desery",
		price: 8.00
    }, {
        name: "Creme brulee",
		category_id: "desery",
		price: 12.00
    }, {
        name: "Sernik po wiedeńsku",
		category_id: "desery",
		price: 8.00
    }, {
        name: "Coca Cola",
		category_id: "desery",
		price: 5.00
    }, {
        name: "Sok",
		category_id: "desery",
		price: 5.00
    }, {
        name: "Woda",
		category_id: "desery",
		price: 3.00
    }, {
        name: "Piwo",
		category_id: "desery",
		price: 5.00
    }
]};

// TODO: replace this with categories collection
router.get('/categories', function(req, res) {
    db.collection('categories').find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/category/:category', function(req, res) {
    var category = req.params.category;
    db.collection('dishes')
        .find({ category_id: category })
        .toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});

router.get('/', function(req, res) {
    db.collection('dishes').find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.get('/:id', function(req, res) {
    db.collection('dishes').findById(req.params.id, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

router.post('/', function(req, res) {
    var dish = {
        name: req.body.name,
        category_id: req.body.category_id,
        price: parseInt(req.body.price, 10),
        ingredients: req.body.ingredients
    }; 
    db.collection('dishes').insert(dish, function(err, result) {
        if (err) throw err;
        if (result) {
            console.log('Dish added', result);
            res.json(result);
        }
    });
});

router.delete('/:id', function(req, res) {
    db.collection('dishes').removeById(req.params.id, function(err, result) {
        if (err) throw err;
        if (result) {
            console.log('Dish removed', result);
            res.json({ success: true });
        }
    });
});

router.put('/:id', function(req, res, next) {
    var dish = {
        name: req.body.name,
        category_id: req.body.category_id,
        price: parseInt(req.body.price, 10),
        ingredients: req.body.ingredients
    }; 
    db.collection('dishes').updateById(req.params.id, dish, function(err, result) {
        if (err) throw err;
        if (result) {
            console.log('Dish updated');
            res.json(result);
        }
    });
});

module.exports = router;
