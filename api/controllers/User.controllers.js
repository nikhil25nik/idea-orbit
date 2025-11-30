import cloudinary from "../config/cloudinary.js";
import { handelError } from "../helpers/handelError.js";
import User from "../models/user.models.js"
import bcryptjs from "bcryptjs"
import dotenv from "dotenv"
dotenv.config()


export const getUser = async(req,res,next)=>{

    try{
        const {userid} = req.params;
        const user = await User.findOne({_id:userid}).lean().exec();

        if(!user){
           return next(handelError(404,"User not found"))
        }

        res.status(200).json({
            success:true,
            message:"User data found",
            user
        })
    }catch(err){
        next(handelError(500,err.message))
    }

}

export const updateUser = async(req,res,next)=>{
   
    const data = JSON.parse(req.body.data);
    const {userid} = req.params

    const user = await User.findById(userid)

    user.name = data.name
    user.email = data.email
    user.bio = data.bio

    if(data.password && data.password.length){
        const hashedPassword = bcryptjs.hashSync(data.password);
        user.password = hashedPassword
    }

    if(req.file){

     const uploadResult = await cloudinary.uploader.upload(
           req.file.path,
           {folder:"ideaorbit" , resource_type:"auto"}
       )
       .catch((error) => {
          next(handelError(500,error.message))
       });
      

       user.avatar = uploadResult.secure_url;
    }

    await user.save()

    const newUser = user.toObject({getters:true});
    delete newUser.password

     res.status(200).json({
            success:true,
            message:"User updated",
            user : newUser
        })
}

export const getAllUsers = async(req,res,next)=>{
    try{
        const users = await User.find().sort({createdAt:-1}).lean().exec()

        const formattedUsers = users.map((u) => {
            delete u.password;
            return u;
        });

        res.status(200).json({
            success:true,
            message:"Users are find successfully",
            users : formattedUsers
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}

export const deleteUser = async(req,res,next)=>{
    try{
        const {userid} = req.params
        const users = await User.findByIdAndDelete(userid)

        res.status(200).json({
            success:true,
            message:"Users are find successfully",
            users 
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}