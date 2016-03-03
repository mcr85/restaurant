var router = require('express').Router();
var dishesController = require('../controllers/dishes');

router.get('/categories', dishesController.getDishCategories);
router.get('/categories/:category', dishesController.getDishesByCategory);
router.get('/', dishesController.getDishes);
router.get('/:id', dishesController.getDish);
router.post('/', dishesController.createDish);
router.delete('/:id', dishesController.removeDish);
router.put('/:id', dishesController.updateDish);

module.exports = router;
