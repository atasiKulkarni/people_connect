const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware.js");

const {
  createPost,
  getPosts,
  toggleLike,
  getMyActivity,
  savePost,
  getSavedPosts,
  updatePost,
  deletePost,
  uploadMiddleware,
} = require("../controllers/PostController.js");

router.post("/", requireAuth, uploadMiddleware, createPost);
router.get("/", requireAuth, getPosts);
router.post("/toggle-likes", requireAuth, toggleLike);
router.get("/my-activity/:user_name", requireAuth, getMyActivity);
router.post("/savePost", requireAuth, savePost);
router.get("/saved-post/:user_name", requireAuth, getSavedPosts);
router.put("/:id", requireAuth, uploadMiddleware, updatePost);
router.delete("/:id", requireAuth, deletePost);

module.exports = router;
