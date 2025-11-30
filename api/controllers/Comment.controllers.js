import { handelError } from "../helpers/handelError.js";
import Comment from "../models/comment.models.js";

export const addComment = async(req,res,next)=>{
    try{
        const {user,blogid,comment} = req.body;
        const newComment = new Comment({
            user:user,
            blogid:blogid,
            comment:comment
        }) 
        await newComment.save();

        res.status(200).json({
            success:true,
            message:"comment added successfully",
            comment:newComment
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}

export const getComment = async(req,res,next)=>{
    try{
        const {blogid} = req.params
        const comments = await Comment.find({blogid}).populate("user","avatar name").sort({createdAt:-1}).lean().exec()
        res.status(200).json({
            comments
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}

export const commentCount = async(req,res,next)=>{
    try{
        const {blogid} = req.params;
        const commentCount = await Comment.countDocuments({blogid})

        res.status(200).json({
            commentCount
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}

export const getAllComments = async(req,res,next)=>{
    try{

        const user = req.user;

        let getComments
        if(user.role === "admin"){

            getComments = await Comment.find().populate("blogid","title slug").populate("user","name").lean().exec()
        }else{
             getComments = await Comment.find({user:user._id}).populate("blogid","title slug").populate("user","name").lean().exec()
        }

        res.status(200).json({
            getComments
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}

export const deleteComment = async(req,res,next)=>{
    try{
        const {commentid} = req.params
        const deleteComment = await Comment.findByIdAndDelete(commentid)

        res.status(200).json({
            success:true,
            message:"comment delete sccessfully",
            deleteComment
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}