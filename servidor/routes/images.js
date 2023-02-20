
const express = require('express');
const router = express.Router();

// Multer config
const multer = require('multer');
const upload = multer();

// Controller
const imagesController = require('../controllers/images.controller');

// Upload image
router.post('/png', upload.single('image'), imagesController.processImagePngToS3);
router.post('/convert-and-download', upload.single('image'), imagesController.converImage);
router.post('/', upload.single('image'), imagesController.processImageToS3);

// Get images
router.get('/count_by_hour', imagesController.findImagesByHour);
router.get('/search', imagesController.findImagesByDateRangeDb);
router.get('/:id', imagesController.getImageByIdDb);
router.get('/', imagesController.getImagesDb);

// Download image
router.get('/:id/download', imagesController.downloadImage);

module.exports = router;