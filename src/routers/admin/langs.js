const langsController = require('../../controllers/admin/langsController');
const router = require("express").Router();
router.get('/', langsController.FindAll);
router.get('/:id', langsController.FindById);
router.patch('/:id', langsController.Update);
router.post('/:id', langsController.Create);
router.delete('/:id', langsController.Delete);
module.exports = router;