var request = require('superagent');
var expect = require('expect.js');

describe('Suite one', function() {
    it('get dishes', function(done) {
        request('localhost:3000/api/dishes').end(function(res) {
            expect(res).to.exist;
            expect(res.status).to.equal(200);
            done();
        });
    });
});
