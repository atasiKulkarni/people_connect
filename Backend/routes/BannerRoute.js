const express = require('express');
const router = express.Router();
const {
    getBanners,
    getBannerById,
    addBanner,
    updateBanner,
    uploadMiddleware,
    deleteBanner
} = require('../controllers/BannerController.js');

router.get("/", getBanners);
router.get("/:id", getBannerById);
router.post("/", uploadMiddleware,addBanner);
router.put("/:id", uploadMiddleware,updateBanner);
router.delete("/:id", deleteBanner);

module.exports = router;