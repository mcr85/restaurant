var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

exports.getDishes = function(req, res) {
    db.collection('dishes').find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
};

exports.getDish = function(req, res) {
    db.collection('dishes').findById(req.params.id, function(err, result) {
        if (err) throw err;
        res.json(result);
    });
};

exports.createDish = function(req, res) {
    var dish = parseDishData(req.body);
    db.collection('dishes').insert(dish, function(err, result) {
        if (err) throw err;
        if (result && result.length > 0) {
            console.log('Dish added', result);
            res.json(result[0]);
        }
    });
};

exports.removeDish = function(req, res) {
    db.collection('dishes').removeById(req.params.id, function(err, result) {
        if (err) throw err;
        if (result) {
            console.log('Dish removed', result);
            res.json({ success: true });
        }
    });
};

exports.updateDish = function(req, res, next) {
    var dish = parseDishData(req.body);
    db.collection('dishes').updateById(req.params.id, dish, function(err, result) {
        if (err) throw err;
        if (result && result.length > 0) {
            console.log('Dish updated');
            res.json(result[0]);
        }
    });
};

exports.getDishCategories = function(req, res) {
    db.collection('categories').find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
};

exports.getDishesByCategory = function(req, res) {
    var category = req.params.category;
    db.collection('dishes') .find({ category_id: category })
        .toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
};


function parseDishData(requestBody) {
    return {
        name: requestBody.name,
        category_id: requestBody.category_id,
        price: parseInt(requestBody.price, 10),
        ingredients: requestBody.ingredients
    }; 
}
