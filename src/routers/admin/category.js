const categoryController = require('../../controllers/admin/categoryController');
const router = require("express").Router();
router.get('/', categoryController.FindAll);
router.post('/search', categoryController.SearchName);
router.get('/:id', categoryController.FindById);
router.patch('/:id', categoryController.Update);
router.post('/', categoryController.Create);
router.delete('/:id', categoryController.Delete);
module.exports = router;