import jwt from "jsonwebtoken"

export const authenticate = async(req,res,next)=>{
    try{
        
       const token = req.cookies.access_token;

       if(!token){
        next(403, "Unauthorized")
       }

       const decodeToken = jwt.verify(token, process.env.JWT_SECRET)
       req.user = decodeToken
       next()
    }catch(err){
        next(500,err.message)
    }
}