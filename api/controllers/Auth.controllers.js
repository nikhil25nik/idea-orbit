import { handelError } from "../helpers/handelError.js";
import User from "../models/user.models.js"
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"

export const Register = async(req,res,next)=>{
    
try{

    const {name, email,password} = req.body;

    const checkUser = await User.findOne({email});
    if(checkUser){
        next(handelError(409,"user already registered"));
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const user = new User({
        name,email, password:hashedPassword
    })
    await user.save();

    res.status(200).json({
        success:true,
        message:"Registration successful"
    })
}catch(err){
    next(handelError(500,err.message));
}
}

export const Login = async(req,res,next)=>{
    try{
  const {email, password} = req.body;

  const user = await User.findOne({email});
  if(!user){
    next(handelError(404, "Indavlid login credentials"))
  }
  const hashedPassword = user.password;
  const comparePassword = await bcryptjs.compare(password,hashedPassword)

  if(!comparePassword){
   return next(handelError(404,"Invalid login credintials"))
  }

  const token = jwt.sign({
    _id:user._id,
    name:user.name,
    email:user.email,
    avatar:user.avatar,
    role:user.role
  },process.env.JWT_SECRET)

  res.cookie("access_token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:process.env.NODE_ENV === "production" ? 'none' :'strict',
    path:"/"
  })

  const newUser = user.toObject({getters:true});
  delete newUser.password

  res.status(200).json({
    success:true,
    user:newUser,
    message:"Login successfull"
  })


    }catch(err){
        next(handelError(404,err.message))
    }
   
}
export const GoogleLogin = async(req,res,next)=>{
    try{
  const {name,email,avatar} = req.body;
  let user;
   user = await User.findOne({email});
  if(!user){
    const password = Math.random().toString();
    const hashedPassword = bcryptjs.hashSync(password);

    const newUser = new User({
        name,email,password:hashedPassword,avatar
    })

    user = await newUser.save();
  }


  const token = jwt.sign({
    _id:user._id,
    name:user.name,
    email:user.email,
    avatar:user.avatar,
    role: user.role
  },process.env.JWT_SECRET)

  res.cookie("access_token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:process.env.NODE_ENV === "production" ? 'none' :'strict',
    path:"/"
  })

  const newUser = user.toObject({getters:true});
  delete newUser.password

  res.status(200).json({
    success:true,
   user: newUser,
    message:"Login successfull"
  })


    }catch(err){
        next(handelError(404,err.message))
    }
   
}

export const Logout = async(req,res,next)=>{
    try{

  res.clearCookie("access_token",{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:process.env.NODE_ENV === "production" ? 'none' :'strict',
    path:"/"
  })

  res.status(200).json({
    success:true,
    message:"Logout successfull"
  })


    }catch(err){
        next(handelError(404,err.message))
    }
   
}