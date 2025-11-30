import express from "express"
import { addComment, commentCount, deleteComment, getAllComments, getComment } from "../controllers/Comment.controllers.js"
import { authenticate } from "../middleware/authenticate.js"

const CommentRoute = express.Router()

CommentRoute.post("/add",authenticate, addComment)
CommentRoute.get("/get/:blogid",getComment)
CommentRoute.get("/get-count/:blogid",commentCount)
CommentRoute.get("/get-all-comments",authenticate,getAllComments)
CommentRoute.delete("/delete/:commentid",authenticate,deleteComment)

export default CommentRoute;