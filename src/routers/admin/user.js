const userController = require('../../controllers/admin/userController');
const router = require("express").Router();
router.get('/', userController.FindAll);
router.get('/:id', userController.FindById);
router.patch('/:id', userController.Update);
router.post('/:id', userController.Create);
router.delete('/:id', userController.Delete);
module.exports = router;