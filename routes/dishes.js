var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json({ name: 'Kotlet schabowy', cena: 15.0 });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    res.json({ _id: id });
});

module.exports = router;
