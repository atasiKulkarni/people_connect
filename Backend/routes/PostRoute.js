var express = require("express");
var router = express.Router();
const {
    createPost,
    getPosts,
    uploadMiddleware,
    updatePost,
    deletePost
} = require("../controllers/postController");

router.post("/", uploadMiddleware,createPost);
router.get("/", getPosts);
router.put("/:id", uploadMiddleware,updatePost);
router.delete("/:id", deletePost);


module.exports = router;
