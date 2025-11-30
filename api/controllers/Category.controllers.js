import { handelError } from "../helpers/handelError.js"
import Category from "../models/category.model.js";

export const addCategory = async(req,res,next)=>{
    try{

        const {name,slug} = req.body;
        console.log(name)

        let category = new Category({
            name,slug
        })

        console.log(category)
        await category.save()

        res.status(200).json({
            success:true,
            message:"category added successfully"
        })

    }catch(err){
        next(handelError(500,err.message))
    }

}
export const showCategory = async(req,res,next)=>{
       try{
        const {categoryid} = req.params;
        const category = await Category.findById(categoryid);

        if(!category){
            next(handelError(500,"Data not found"))
        }
        res.status(200).json({
            category
        })
        
    }catch(err){
        next(handelError(500,err.message))
    }
}
export const updateCategory = async(req,res,next)=>{
       try{

        const {name,slug} = req.body;
        const {categoryid} = req.params;

        const category = await Category.findByIdAndUpdate(categoryid,{
            name,slug
        },{new:true})

        res.status(200).json({
            success:true,
            message:"category update successfully",
            category
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}
export const deleteCategory = async(req,res,next)=>{
       try{

        const {categoryid} = req.params;
       await Category.findByIdAndDelete(categoryid);

        res.status(200).json({
            success:true,
            message:"category deleted successfully"
        })

    }catch(err){
        next(handelError(500,err.message))
    }
}
export const allCategory = async(req,res,next)=>{
       try{
        const category = await Category.find().sort({name:1}).lean().exec()
        res.status(200).json({
            category
        })
    }catch(err){
        next(handelError(500,err.message))
    }
}