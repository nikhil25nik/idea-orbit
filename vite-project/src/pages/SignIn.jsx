import { Button } from "@/components/ui/button";
import {  Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {  z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from "@/components/ui/card";
import { RouteIndex, RouteSignUp } from "@/helper/RouteName";
import { showToast } from "@/helper/showToast";
import { getEnv } from "@/helper/getEnv";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice.js";
import GoogleLogin from "@/components/GoogleLogin";
import logo from "@/assets/images/IdeaOrbit_logos.png"

export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formSchema = z.object({
  email: z.string().email(),
  password : z.string().min(8,"Password must be 8 charcter long"),

})

const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })


  async function onSubmit(values) {
  
    try{
  
    
      const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/api/auth/login`,{
        method:"post",
        headers:{"Content-type":"application/json"},
        credentials:"include",
        body:JSON.stringify(values)
      })

      const data = await response.json();
      if(!response.ok){
        return showToast("error",data.message)
      }
      dispatch(setUser(data.user))
      navigate(RouteIndex)
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
          <img className=" w-[200px]" src={logo} alt="" />
          </Link>
        </div>
        <h1 className="text-2xl text-center font-bold mb-5">Login info</h1>

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

          <div>
            
          <Button type="submit" className="w-full">Sign In</Button>
          </div>
          <div className="flex justify-center items-center mt-5 text-sm gap-2">
            <p>Don&apos;t have account? <a href={RouteSignUp}  className="text-blue-500 hover:underline">Sign Up</a></p>
          </div>
        </form>
      </Form>
      </Card>
      
    </div>
  );
}
