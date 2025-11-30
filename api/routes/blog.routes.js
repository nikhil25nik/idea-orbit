import express from "express"
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogByCategory, getReletedBlog, search, showAllBlog, updateBlog } from "../controllers/Blog.controllers.js"
import upload from "../config/multer.js"
import { authenticate } from "../middleware/authenticate.js"

const BlogRoute = express.Router()

BlogRoute.post("/add",upload.single("file") ,authenticate, addBlog)
BlogRoute.get("/edit/:blogid",authenticate,editBlog)
BlogRoute.put("/update/:blogid",upload.single("file"),authenticate, updateBlog)
BlogRoute.delete("/delete/:blogid",authenticate,deleteBlog)

BlogRoute.get("/get-all",authenticate, showAllBlog)
BlogRoute.get("/get-blog/:slug",getBlog)
BlogRoute.get("/get-releted-blog/:category/:blog",getReletedBlog)
BlogRoute.get("/get-blog-by-category/:category",getBlogByCategory)
BlogRoute.get("/search",search)

BlogRoute.get("/blogs",getAllBlogs)


export default BlogRoute;