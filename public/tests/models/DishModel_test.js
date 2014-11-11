describe('Dish model suite', function() {

    beforeEach(function() {
        this.dishModel = new app.models.Dish();
    });

    describe('Instantiation', function() {
        it('Is defined', function() {
            expect(app.models.Dish).to.be.ok();
        });

        it('Can be instantiated', function() {
            expect(this.dishModel).to.be.ok();
        });

        it('Has set root url', function() {
            expect(this.dishModel.urlRoot).to.be('/api/dishes');
        });
    });

    describe('Dish default values', function() {
        it('Has default name empty', function() {
            expect(this.dishModel.get('name')).to.equal('');
        });

        it('Has default category_id empty', function() {
            expect(this.dishModel.get('category_id')).to.equal('');
        });

        it('Has default price of 0', function() {
            expect(this.dishModel.get('price')).to.equal(0);
        });

        it('Has default ingredients of empty array', function() {
            expect(this.dishModel.get('ingredients')).to.be.an(Array);
            expect(this.dishModel.get('ingredients')).to.have.length(0);
        });
    });

    describe('Dish validation', function() {
        beforeEach(function() {
            this.errorEventSpy = sinon.spy();
            this.dishModel.bind('invalid', this.errorEventSpy);
        });

        it('Should not save when name is empty', function() {
            this.dishModel.save({ name: '' });
            expect(this.errorEventSpy.calledOnce).to.be.ok();
            expect(this.errorEventSpy.calledWith(
                this.dishModel, 
                'cannot have empty name'
              )).to.be.ok();
        });

        it('Should not save when category_id is empty', function() {
            this.dishModel.save({ name: 'Dish name', category_id: ''});
            expect(this.errorEventSpy.calledOnce).to.be.ok();
            expect(this.errorEventSpy.calledWith(
                this.dishModel, 
                'cannot have empty category_id'
              )).to.be.ok();
        });
    });

    describe('Dish saved', function() {
        beforeEach(function() {
            var dish = {
                _id: 1,
                name: 'pierogi',
                category_id: 'lunch',
                price: 9.99,
                ingredients: []
            };
            this.server = sinon.fakeServer.create();
            this.server.respondWith('POST', '/api/dishes', [
                200,
                { 'Content-Type': 'application/json' },
                JSON.stringify(dish)
            ]);

            this.dishModel.set('name', 'pierogi');
            this.dishModel.set('category_id', 'lunch');
            this.dishModel.set('price', 9.99);

        });

        it('sends proper post request on save', function() {
            this.dishModel.save();
            this.server.respond();

            expect(this.server.requests.length).to.be(1);
            expect(this.server.requests[0].method).to.be('POST');
            expect(this.server.requests[0].url).to.be('/api/dishes');
        });

        it('sets _id on save', function() {
            this.dishModel.save();
            this.server.respond();

            expect(this.dishModel.get('_id')).to.be(1);
        });

        afterEach(function() {
            this.server.restore();
        });
    });

});
