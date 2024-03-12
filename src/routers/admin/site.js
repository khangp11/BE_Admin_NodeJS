const siteController = require('../../controllers/admin/siteController');
const router = require("express").Router();

router.get('/', siteController.FindAll);
router.get('/:id', siteController.FindById);
router.patch('/:id', siteController.Update);
router.post('/:id', siteController.Create);
router.delete('/:id', siteController.Delete);

module.exports = router;