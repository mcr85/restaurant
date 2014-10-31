var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

exports.getDishCategories = function(req, res) {
    db.collection('categories').find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}

exports.getDishesByCategory = function(req, res) {
    var category = req.params.category;
    db.collection('dishes') .find({ category_id: category })
        .toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
}

exports.getDishes = function(req, res) {
    db.collection('dishes').find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}

exports.getDish = function(req, res) {
    db.collection('dishes').findById(req.params.id, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
}


exports.createDish = function(req, res) {
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
}

exports.removeDish = function(req, res) {
    db.collection('dishes').removeById(req.params.id, function(err, result) {
        if (err) throw err;
        if (result) {
            console.log('Dish removed', result);
            res.json({ success: true });
        }
    });
}

exports.updateDish = function(req, res, next) {
    var dish = parseDishData(req.body);
    db.collection('dishes').updateById(req.params.id, dish, function(err, result) {
        if (err) throw err;
        if (result) {
            console.log('Dish updated');
            res.json(result);
        }
    });
}

function parseDishData(requestBody) {
    return {
        name: requestBody.body.name,
        category_id: requestBody.body.category_id,
        price: parseInt(requestBody.body.price, 10),
        ingredients: requestBody.body.ingredients
    }; 
}
