var app = app || {};
app.models = app.models || {};

(function(app) {
    app.models.Dish = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/dishes',
        defaults: {
            name: '',
            category: '',
            price: 0,
            ingredients: []
        }
    });
}(app));
