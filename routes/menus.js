var router = require('express').Router();
var menusController = require('../controllers/menus');

router.get('/', menusController.getMenus);
router.get('/:id', menusController.getMenu);
router.post('/', menusController.createMenu);
router.delete('/:id', menusController.removeMenu);
router.put('/:id', menusController.updateMenu);

module.exports = router;
