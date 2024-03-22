const menuController = require('../../controllers/admin/menuController');
const { route } = require('./user');

const router = require("express").Router();
router.get('/menu/', menuController.FindAll);
router.get('/menu/:id', menuController.FindById);
router.patch('/menu/:id', menuController.updateStatus);
router.post('/menu/', menuController.Create);
router.delete('/menu/:id', menuController.Delete);



module.exports = router;