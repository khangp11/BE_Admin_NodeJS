const categoryController = require('../controllers/categoryController');
const router = require("express").Router();
router.get('/', categoryController.FindAll);
router.post('/searchname', categoryController.SearchName);
router.get('/:id', categoryController.FindById);
router.patch('/:id', categoryController.Update);
router.post('/:id', categoryController.Create);
router.delete('/:id', categoryController.Delete);
module.exports = router;