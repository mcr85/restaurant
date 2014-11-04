var request = require('superagent');
var expect = require('expect.js');

describe('Dishes suite', function() {

    it('get dishes', function(done) {
        request('localhost:3000/api/dishes').end(function(res) {
            expect(res.status).to.equal(200);
            expect(res.type).to.match(/json/);
            expect(res.body.length).to.be.above(0);
            done();
        });
    });

    it('gets dish', function(done) {
        getFirstDishId(function(dishId) {
            request('localhost:3000/api/dishes/' + dishId).end(function(res) {
                expect(res.status).to.equal(200);
                expect(res.type).to.match(/json/);
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('category_id');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('ingredients');
                done();
            });
        });
    });

    it('gets dish by category', function(done) {
        var category = 'zupy';
        request('localhost:3000/api/dishes/category/' + category).end(function(res) {
            done();
        });
    });

    it('gets dish categories', function(done) {
        request('localhost:3000/api/dishes/categories').end(function(res) {
            var menu = res.body[0];
            expect(res.status).to.equal(200);
            expect(res.body.length).to.be.above(0);
            expect(menu).to.have.property('id');
            expect(menu).to.have.property('name');
            done();
        });
    });

    xit('creates dish', function(done) { done(); });
    xit('updates dish', function(done) { done(); });
    xit('removes dish', function(done) { done(); });
});

function getFirstDishId(callback) {
    request('localhost:3000/api/dishes').end(function(res) {
        callback(res.body[0]._id);
    });
}

describe('Menus suite', function() {

    it('gets menus', function(done) {
        request('localhost:3000/api/menus').end(function(res) {
            var menu = res.body[0];
            expect(res.status).to.equal(200);
            expect(res.body.length).to.be.above(0);
            expect(menu).to.have.property('name');
            expect(menu).to.have.property('dishes');
            expect(menu.dishes.length).to.be.above(0);
            done();
        });
    });

    it('gets menu', function(done) {
        getMenuId(function(menuId) {
            request('localhost:3000/api/menus/' + menuId).end(function(res) {
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('dishes');
                expect(res.body.dishes.length).to.be.above(0);
                done();
            });
        });
    });

    xit('creates menu', function(done) { done(); });
    xit('updates menu', function(done) { done(); });
    xit('removes menu', function(done) { done(); });

});

function getMenuId(callback) {
    request('localhost:3000/api/menus').end(function(res) {
        callback(res.body[0]._id);
    });
}

describe('Week menus suite', function() {

    it('gets week menus', function(done) {
        request('localhost:3000/api/week-menus').end(function(res) {
            var weekMenu = res.body[0];
            expect(res.status).to.be.equal(200)
            expect(res.body.length).above(0);
            expect(weekMenu).to.have.property('day');
            expect(weekMenu.day).to.be.a('number');
            expect(weekMenu).to.have.property('menu_id');
            expect(weekMenu).to.have.property('menu_name');
            done();
        });
    });

    it('gets menu for given day', function(done) {
        request('localhost:3000/api/week-menus/1').end(function(res) {
            done();
        });
    });
});
