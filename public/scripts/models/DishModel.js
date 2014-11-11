var app = app || {};
app.models = app.models || {};

(function(app) {
    app.models.Dish = Backbone.Model.extend({
        idAttribute: '_id',
        urlRoot: '/api/dishes',
        defaults: {
            name: '',
            category_id: '',
            price: 0,
            ingredients: []
        },
        validate: function(attrs) {
            if (!attrs.name) {
                return 'cannot have empty name';
            }
            if (!attrs.category_id) {
                return 'cannot have empty category_id';
            }
        }
    });
}(app));
