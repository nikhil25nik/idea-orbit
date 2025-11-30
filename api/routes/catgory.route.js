import express from "express"
import { addCategory, allCategory, deleteCategory, showCategory, updateCategory } from "../controllers/Category.controllers.js"
import { onlyAdmin } from "../middleware/onlyAdmin.js"

const CategoryRoute = express.Router()

CategoryRoute.post("/add",onlyAdmin, addCategory)
CategoryRoute.put("/update/:categoryid",onlyAdmin, updateCategory)
CategoryRoute.get("/show/:categoryid",onlyAdmin, showCategory)
CategoryRoute.delete("/delete/:categoryid",onlyAdmin, deleteCategory)
CategoryRoute.get("/all-category", allCategory)

export default CategoryRoute;