var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});

exports.getMenus = function(req, res) {
    db.collection('menus').find().toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
};

exports.getMenu = function(req, res) {
    var id = req.params.id;
    db.collection('menus').findById(id, function(err, menu) {
        if (err) throw err;

        var dishesIDs = menu.dishes.map(function(id) {
            return mongoskin.helper.toObjectID(id);
        });

        db.collection('dishes').find( { _id: { $in : dishesIDs }})
            .toArray(function(err, dishes) {
                if (err) throw err;
                menu.dishes = dishes;
                res.json(menu);
            });
    });
};

exports.createMenu = function(req, res) {
    if (req.body && req.body.name || req.body.dishes.length > 0) {
        var menu = parseMenuData(req.body);
        db.collection('menus').insert(menu, function(err, result) {
            if (err) throw err;
            if (result && result.length > 0) {
                console.log('Menu added', result);
                res.json(result[0]);
            }
        });
    } else {
        throw new Error('Wrong Menu data');
    }
};

exports.removeMenu = function(req, res) {
    db.collection('menus').removeById(req.params.id, function(err, result) {
        if (err) throw err;
        console.log('Menu removed', result);
        res.json({ success: true });
    });
};

exports.updateMenu = function(req, res) {
    if (req.body && req.body.name || req.body.dishes.length > 0) {
        var menu = parseMenuData(requestBody);
        db.collection('menus').updateById(req.params.id, menu, function(err, result) {
            if (err) throw err;
            if (result && result.length > 0) {
                console.log('Menu updated', result);
                res.json(result[0]);
            }
        });
    } else {
        throw new Error('Wrong Menu data');
    }
};

function parseMenuData(requestBody) {
    return {
        name: requestBody.name,
        dishes: requestBody.dishes
    };
}
