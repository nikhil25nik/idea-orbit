import { Button } from "@/components/ui/button";
import {  Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card";
import { RouteIndex, RouteSignIn } from "@/helper/RouteName.js";
import { getEnv } from "@/helper/getEnv.js";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "@/helper/showToast.js";
import GoogleLogin from "@/components/GoogleLogin";
import logo from "@/assets/images/IdeaOrbit_logos.png"

export default function SignUp(){

    const navigate = useNavigate();

 const formSchema = z.object({
    name: z.string().min(3,"name must be 3 character long."),
  email: z.string().email(),
  password : z.string().min(8,"Password must be 8 charcter long"),
  confirmPassword: z.string().refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"], // shows error under confirmPassword field
  })

})

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name:"",
      email: "",
      password:"",
      confirmPassword:""

    },
  })

  async function onSubmit(values) {

  try{
    const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/api/auth/register`,{
      method:"post",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(values)
    })

    const data = await response.json();
    if(!response.ok){
      return showToast("error",data.message)
    }
    navigate(RouteSignIn)
    showToast("success",data.message);
  }catch(err){
    showToast("error",err.message);
  }
  }

    return(
       <div className="flex justify-center items-center w-screen h-screen">

      <Card className="w-[400px] p-6">
        <div  className="flex justify-center items-center mb- 3">
          <Link to={RouteIndex}>
          <img className=" w-[100px]" src={logo} alt="" />
          </Link>
        </div>
        <h1 className="text-2xl text-center font-bold mb-5">Create Your Account</h1>

        <div>
          <GoogleLogin />
          <div className="border my-5 flex justify-center items-center">
            <span className="absoulte bg-white text-sm">Or</span>
          </div>
        </div>
<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="mb-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

           <div className="mb-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="mb-3">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="mb-3">
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>confirmPassword</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your confirmPassword..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <div>
            
          <Button type="submit" className="w-full">Sign Up</Button>
          </div>
          <div className="flex justify-center items-center mt-5 text-sm gap-2">
            <p>Already  have a account? <a href={RouteSignIn}  className="text-blue-500 hover:underline">Sign Up</a></p>
          </div>
        </form>
      </Form>
      </Card>
      
    </div>
    )
}