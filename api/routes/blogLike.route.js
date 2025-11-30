import express from "express"
import { doLike, getLike } from "../controllers/BlogLike.controllers.js"
import { authenticate } from "../middleware/authenticate.js";

const BlogLikeRoute = express.Router()

BlogLikeRoute.post("/do-like",authenticate, doLike)
BlogLikeRoute.get("/get-like/:blogid", getLike);


export default BlogLikeRoute