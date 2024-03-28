const userController = require('../../controllers/admin/userController');
const router = require("express").Router();
router.get('/', userController.FindAll);
router.get('/:id', userController.FindById);
router.patch('/:id', userController.Update);
router.post('/', userController.Create);
router.delete('/:id', userController.Delete);
router.post('/search/', userController.FindAll);
module.exports = router;