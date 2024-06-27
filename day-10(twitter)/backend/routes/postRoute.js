import express from "express";  
import { getPosts, createPost, updatePost, deletePost } from "../controller/postController.js";
import { authenticateUser } from "../controller/authController.js";

const router = express.Router();

router.post("/posts/add", authenticateUser, createPost);
router.get("/posts/get", authenticateUser, getPosts);
router.put("/posts/:id", authenticateUser, updatePost);
router.delete("/posts/:id", authenticateUser, deletePost);

export default router;

