import { Router } from "express";

import {
  createBlog,
  getAllBlogs,
  getBlogById,
  removeBlog,
  updateBlog,
} from "../controllers/blog-controller";
import { protect } from "middleware/auth-middleware";



const router: Router = Router();

router.post("/create", protect, createBlog);
router.get("/list", getAllBlogs);
router.get("/blog/:id", protect, getBlogById);
router.put("/update/:id", protect, updateBlog);
router.delete("/remove/:id", protect, removeBlog);

export default router;
