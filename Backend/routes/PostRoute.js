var express = require("express");
var router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware.js');

const {
    createPost,
    getPosts,
    uploadMiddleware,
    updatePost,
    deletePost,
    toggleLike,
    getMyActivity,
    savePost,
    getSavedPosts
} = require("../controllers/PostController");

router.post("/", requireAuth,uploadMiddleware,createPost);
router.get("/", requireAuth,getPosts);
router.post("/toggle-likes", requireAuth,toggleLike);
router.get("/my-activity/:user_name", requireAuth,getMyActivity);
router.post("/savePost", requireAuth,savePost);
router.get("/saved-post/:user_name", requireAuth,getSavedPosts);
router.put("/:id", requireAuth,uploadMiddleware,updatePost);
router.delete("/:id", requireAuth,deletePost);


module.exports = router;
