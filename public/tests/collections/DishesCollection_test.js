describe('Dishes collection suite', function() {

    beforeEach(function() {
        this.dishModelStub = sinon.stub(app.models, "Dish");
        this.model = new Backbone.Model({
            id: 1,
            name: 'pierogi',
            category_id: 'lunch',
            price: 9.99,
            ingredients: []
        });
        this.dishModelStub.returns(this.model);
        this.dishesCollection = new app.collections.Dishes();
        this.dishesCollection.model = app.models.Dish;
        this.dishesCollection.add({ });
    });

    afterEach(function() {
        this.dishModelStub.restore();
    });

    it('Can be instantiated', function() {
        expect(this.dishesCollection).to.be.ok();
        expect(this.dishesCollection.get(1).get('id')).to.be(1);
        expect(this.dishesCollection.get(1).get('name')).to.be('pierogi');
    });

});
