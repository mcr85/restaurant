var router = require('express').Router();
var weeklyMenusController = require('../controllers/weekMenus');

router.get('/', weeklyMenusController.getWeeklyMenus);
router.get('/:day', weeklyMenusController.getWeeklyMenu);
router.post('/', weeklyMenusController.createWeeklyMenu);
router.put('/:day', function(req, res) {
    // update menu for given day
    // can change menu id
});
router.delete('/:day', weeklyMenusController.removeWeeklyMenu);

module.exports = router;
