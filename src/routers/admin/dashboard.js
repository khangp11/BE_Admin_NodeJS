const dashboardController = require('../../controllers/admin/dashboardController');
const router = require("express").Router();

const checkPermission = require("../../Middleware/permissionsMiddleware");

router.use(checkPermission('1'));


router.get('/dashboard/', dashboardController.FindAll);
router.get('/news/', dashboardController.FindAll);
router.get('/news/:id', dashboardController.FindById);
router.patch('/news/:id', dashboardController.Update);
router.post('/news', dashboardController.Create);
router.delete('/news/:id', dashboardController.Delete);
router.post('/news/search', dashboardController.Search);
router.post('/news/totalpost/', dashboardController.CalculateTotalPosts);
// thống kê
router.get('/allnews/', dashboardController.AllNews);
router.get('/allusers/', dashboardController.AllUsers);

module.exports = router;