const dashboardController = require('../../controllers/admin/dashboardController');
const router = require("express").Router();
router.get('/dashboard/', dashboardController.FindAll);
router.get('/news/', dashboardController.FindAll);
router.get('/news/:id', dashboardController.FindById);
router.patch('/news/:id', dashboardController.Update);
router.post('/news', dashboardController.Create);
router.delete('/news/:id', dashboardController.Delete);
router.post('/news/search', dashboardController.Search);
router.post('/news/totalpost/', dashboardController.CalculateTotalPosts);
// thống kê
router.get('/news/allnews', dashboardController.AllNews);
router.get('/news/allusers', dashboardController.AllUsers);

module.exports = router;