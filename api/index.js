import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from "./routes/auth.routes.js";
import { errorMiddleware } from "./helpers/handelError.js";
import UserRoute from "./routes/user.routes.js";
import CategoryRoute from "./routes/catgory.route.js";
import BlogRoute from "./routes/blog.routes.js";
import CommentRoute from "./routes/comment.routes.js";
import BlogLikeRoute from "./routes/blogLike.route.js";

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use("/api/auth",AuthRoute);
app.use("/api/user",UserRoute);
app.use("/api/category",CategoryRoute)
app.use("/api/blog",BlogRoute)
app.use("/api/comment",CommentRoute)
app.use("/api/like",BlogLikeRoute)

main()
.then(()=>{
    console.log("DB Connect successfully");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
await mongoose.connect(process.env.MONGO_CONN)
}


app.use(errorMiddleware);


app.listen(PORT,()=>{
    console.log(`app is listening on port ${PORT}`);
})

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";

    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})