const listMenuController = require('../../controllers/admin/listMenuController.js');

const router = require("express").Router();

router.get('/listmenu/', listMenuController.FindAll);
router.get('/listmenu/:id', listMenuController.FindById);
router.patch('/listmenu/:id', listMenuController.updateStatus);
router.post('/listmenu/', listMenuController.Create);
router.delete('/listmenu/:id', listMenuController.Delete);
router.post('/listmenu/search/', listMenuController.FindAll);


module.exports = router;