import { FaComments } from "react-icons/fa6";
import {  Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { showToast } from "@/helper/showToast";
import { getEnv } from "@/helper/getEnv";
import { useSelector } from "react-redux";
import { RouteSignIn } from "@/helper/RouteName";
import { Link } from "react-router-dom";
import { useState } from "react";
import CommentLists from "./CommentLists";


export default function Comments({props}){
  const [newComment,setNewComment] = useState();
  const user = useSelector((state)=>state.user)
    const formSchema = z.object({
      comment: z.string().min(3,"Comment at least 3 character long."),
    
    
    })
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          comment: "",
        },
      })
    
      async function onSubmit(values){
        try{
          const newValues = {...values,user:user?.user?._id,blogid:props.blogid}
          const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/api/comment/add`,{
            method:"POST",
            credentials:"include",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(newValues)
          })

          const data = await response.json()
          if(!response.ok){ 
           return showToast("error",data.message)
          }

          showToast("success",data.message);
          setNewComment(data.comment);
          form.reset();
        }catch(err){
          showToast("error",err.message);
        }
      }

    return(
        <div>
            <h4 className="flex items-center gap-2 text-2xl font-bold mb-5">Comment<FaComments className="text-orange-500"/></h4>
            {user && user.isLoggedIn ?
            <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="mb-3">
                      <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Textarea placeholder="Enter your comment..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
        
                      
            
                    <div className="mb-5">
                        
                      <Button type="submit" >Submit</Button>
                      </div>
                     
                    </form>
                  </Form>
                  :
                  <Button className="mb-5">
                    <Link to={RouteSignIn}>
                    Sign In
                    </Link>
                  </Button>
            } 
            <div>
              <CommentLists props={{blogid:props.blogid,newComment}}/>
              </div>             

        </div>
    )
}