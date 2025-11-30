import { handelError } from "../helpers/handelError.js"
import BlogLike from "../models/blogLike.model.js";
import mongoose from "mongoose";

export const doLike = async(req,res,next)=>{
    try {
        const {blogid,user} = req.body;
        
        let like = await BlogLike.findOne({user,blogid})

        if(!like){
            const saveLike = new BlogLike({
                user,blogid
            })
            await saveLike.save()
        }else{
            await BlogLike.findByIdAndDelete(like._id)
        }

        let likeCount = await BlogLike.countDocuments({blogid})
        res.status(200).json({
            likeCount
        })
        
    } catch (error) {
        next(handelError(500,error.message))
    }
}
export const getLike = async(req,res,next)=>{
    try {
        const {blogid} = req.params;
          const { userid } = req.query;
        const likeCount = await BlogLike.countDocuments({blogid})

        let isUserLiked = false
        if (userid && mongoose.Types.ObjectId.isValid(userid)) {
            const userLike = await BlogLike.countDocuments({ blogid, user: userid });
            isUserLiked = userLike > 0;

        }
        

        res.status(200).json({
            likeCount,
            isUserLiked
        })

    } catch (error) {
        next(handelError(500,error.message))
    }
}