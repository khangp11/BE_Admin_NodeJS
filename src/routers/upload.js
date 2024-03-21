const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadimage/controller');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadController.uploadFile);

module.exports = router;