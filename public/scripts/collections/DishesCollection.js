var app = app || {};
app.collections = app.collections || {};

(function(app) {
    app.collections.Dishes = Backbone.Collection.extend({
        model: app.models.Dish,
        url: '/app/dishes'
    });
}(app));
