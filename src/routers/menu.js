const menuController = require('../controllers/menuController');
const router = require("express").Router();
router.get('/', menuController.FindAll);
router.get('/:id', menuController.FindById);
router.patch('/:id', menuController.Update);
router.post('/:id', menuController.Create);
router.delete('/:id', menuController.Delete);
module.exports = router;