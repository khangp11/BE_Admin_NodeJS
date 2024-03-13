const categoryController = require('../../controllers/admin/categoryController');
const router = require("express").Router();
const checkPermission = require("../../Middleware/permissionsMiddleware");

router.use(checkPermission('1'));

router.get('/', categoryController.FindAll);
router.post('/search', categoryController.SearchName);
router.get('/:id', categoryController.FindById);
router.patch('/:id', categoryController.Update);
router.post('/', categoryController.Create);
router.delete('/:id', categoryController.Delete);

module.exports = router;