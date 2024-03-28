const slideShowController = require('../../controllers/admin/slideShowController');
const router = require("express").Router();
router.get('/', slideShowController.FindAll);
router.get('/:id', slideShowController.FindById);
router.patch('/:id', slideShowController.Update);
router.post('/', slideShowController.Create);
router.delete('/:id', slideShowController.Delete);
router.post('/search/', slideShowController.FindAll);
module.exports = router;