import express from "express";
import dotenv from "dotenv";
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

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());


app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));


const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL, 
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true
    })
);

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/category", CategoryRoute);
app.use("/api/blog", BlogRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/like", BlogLikeRoute);

// DB
mongoose
    .connect(process.env.MONGO_CONN)
    .then(() => console.log("DB Connected"))
    .catch(console.error);

// Error Handler
app.use(errorMiddleware);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
