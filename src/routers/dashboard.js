const dashboardController = require('../controllers/dashboardController');
const router = require("express").Router();
router.get('/', dashboardController.FindAll);
router.get('/:id', dashboardController.FindById);
router.patch('/:id', dashboardController.Update);
router.post('/:id', dashboardController.Create);
router.delete('/:id', dashboardController.Delete);
module.exports = router;