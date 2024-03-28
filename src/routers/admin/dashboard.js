const dashboardController = require('../../controllers/admin/dashboardController');
const router = require("express").Router();

// const checkPermission = require("../../Middleware/permissionsMiddleware");

// router.use(checkPermission('1'));


router.post('/news/search/', dashboardController.FindAll);
router.get('/products/', dashboardController.FindAll);
router.get('/products/:id', dashboardController.FindById);
router.patch('/products/:id', dashboardController.Update);
router.post('/products', dashboardController.Create);
router.delete('/products/:id', dashboardController.Delete);
// router.post('/products/search', dashboardController.Search);
router.post('/products/totalpost/', dashboardController.CalculateTotalPosts);
// thống kê
router.get('/allnews/', dashboardController.AllNews);
router.get('/allusers/', dashboardController.AllUsers);

module.exports = router;