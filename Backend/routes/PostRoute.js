var express = require("express");
var router = express.Router();
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

router.post("/", uploadMiddleware,createPost);
router.get("/", getPosts);
router.post("/toggle-likes", toggleLike);
router.get("/my-activity/:user_name", getMyActivity);
router.post("/savePost", savePost);
router.get("/saved-post/:user_name", getSavedPosts);
router.put("/:id", uploadMiddleware,updatePost);
router.delete("/:id", deletePost);


module.exports = router;
