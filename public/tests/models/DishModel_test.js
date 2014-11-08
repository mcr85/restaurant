describe('Dish model suite', function() {

    var dishModel = new app.models.Dish();

    it('Is defined', function() {
        expect(app.models.Dish).to.be.ok();
    });

    it('Can be instantiated', function() {
        expect(dishModel).to.be.ok();
    });

    xit('Has custom id', function() {
        expect(dishModel.attributes).to.have.property('_id');
    });

    it('Has set root url', function() {
        expect(dishModel.urlRoot).to.be('/api/dishes');
    });

    describe('Dish default values', function() {
        it('Has default name empty', function() {
            expect(dishModel.get('name')).to.equal('');
        });

        it('Has default category empty', function() {
            expect(dishModel.get('category')).to.equal('');
        });

        it('Has default price of 0', function() {
            expect(dishModel.get('price')).to.equal(0);
        });

        it('Has default ingredients of empty array', function() {
            expect(dishModel.get('ingredients')).to.be.an(Array);
            expect(dishModel.get('ingredients')).to.have.length(0);
        });
    });

});
