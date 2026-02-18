const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware.js');
const {
    getBanners,
    getBannerById,
    addBanner,
    updateBanner,
    uploadMiddleware,
    deleteBanner
} = require('../controllers/BannerController.js');

router.get("/", requireAuth,getBanners);
router.get("/:id", requireAuth,getBannerById);
router.post("/", requireAuth,uploadMiddleware,addBanner);
router.put("/:id", requireAuth,uploadMiddleware,updateBanner);
router.delete("/:id", requireAuth,deleteBanner);

module.exports = router;