import cloudinary from "../config/cloudinary.js"
import { handelError } from "../helpers/handelError.js"
import Blog from "../models/blog.model.js"
import {encode} from "entities"
import Category from "../models/category.model.js";

export const addBlog = async(req,res,next)=>{
    
    try{
        const data = JSON.parse(req.body.data)
        let featuredImage = ""
        if(req.file){

           let uploadResult = await cloudinary.uploader.upload(
                req.file.path,
                {folder:"ideaorbit",resource_type:"auto"}
            ).catch((error)=>{
                next(handelError(500,error.message))
            });

            featuredImage = uploadResult.secure_url
        }
        const blog = new Blog({
            author:data.author,
            category:data.category,
            title:data.title,
            slug:data.slug,
            featuredImage:featuredImage,
            blogContent:encode(data.blogContent),
        })

        await blog.save()

        res.status(200).json({
            success:true,
            message:"Blog added successfully",
        
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}

export const editBlog = async(req,res,next)=>{
    try{
        const {blogid} = req.params;
        const blog = await Blog.findById(blogid).populate("category","name")

        if(!blog){
            next(handelError(500,'No data found'))
        }

        res.status(200).json({
            blog
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}
export const updateBlog = async(req,res,next)=>{
    try{

        const {blogid} = req.params;
        const data = JSON.parse(req.body.data);

        const blog = await Blog.findById(blogid)

        blog.category = data.category
        blog.title = data.title
        blog.slug = data.slug
        blog.blogContent = encode(data.blogContent)
        

        let featuredImage = ""
        if(req.file){
            let uploadResult = await cloudinary.uploader.upload(
                req.file.path,
                {folder:"ideaorbit",resource_type:"auto"}
            ).catch(err=>{
                next(handelError(500,err.message))
            })

              featuredImage = uploadResult.secure_url;
        }
        if(featuredImage){
            blog.featuredImage = featuredImage

        }

        await blog.save()

        res.status(200).json({
            success:true,
            message:"Blog updated successfuly",
            blog
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}
export const deleteBlog = async(req,res,next)=>{
    try{

        const {blogid} = req.params;
        await Blog.findByIdAndDelete(blogid)

        res.status(200).json({
            success:true,
            message:"Blog deleted successfully"
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}

export const showAllBlog = async(req,res,next)=>{
    try{

        const user = req.user;
        
        let blog;
        if(user.role === "admin"){
            blog = await Blog.find().populate("author","name avatar role").populate("category","name slug").sort({ createdAt: -1 }).lean().exec()

        } else{
             blog = await Blog.find({author:user._id}).populate("author","name avatar role").populate("category","name slug").sort({ createdAt: -1 }).lean().exec()
        }

        res.status(200).json({
            blog
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}

export const getBlog = async(req,res,next)=>{
    try{
        const {slug} = req.params;
        const blog = await Blog.findOne({slug}).populate("author","name avatar role").populate("category","name slug").lean().exec()


        res.status(200).json({
            blog
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}

export const getReletedBlog = async(req,res,next)=>{
    try{
        const {category,blog} = req.params;
        const categoryData = await Category.findOne({slug:category})
        if(!categoryData){
            return next(404,"Category Data not found!")
        }
        const categoryId = categoryData._id;
        const reletedBlog = await Blog.find({category:categoryId, slug:{$ne:blog}}).lean().exec()


        res.status(200).json({
            reletedBlog
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}
export const getBlogByCategory = async(req,res,next)=>{
    try{
        const {category} = req.params;
        const categoryData = await Category.findOne({slug:category})
        if(!categoryData){
            return next(404,"Category Data not found!")
        }
        const categoryId = categoryData._id;
        const blogCategory = await Blog.find({category:categoryId}).populate("author","name avatar role").populate("category","name slug").lean().exec()


        res.status(200).json({
            blogCategory,
            categoryData
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}

export const search = async(req,res,next)=>{
    try{
        const {q} = req.query;
    
        const blog = await Blog.find({title:{$regex:q, $options:"i"}}).populate("author","name avatar role").populate("category","name slug").lean().exec()

        res.status(200).json({
            blog,
            
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}


export const getAllBlogs = async(req,res,next)=>{
    try{
           const blog = await Blog.find().populate("author","name avatar role").populate("category","name slug").sort({ createdAt: -1 }).lean().exec()

        res.status(200).json({
            blog
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}