const menuController = require('../../controllers/admin/menuController');
const router = require("express").Router();
router.get('/', menuController.FindAll);
router.get('/:id', menuController.FindById);
router.patch('/:id', menuController.Update);
router.post('/', menuController.Create);
router.delete('/:id', menuController.Delete);

module.exports = router;