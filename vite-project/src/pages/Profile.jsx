import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "@/hooks/useFetch.js";
import { getEnv } from "@/helper/getEnv.js";
import Loading from "@/components/Loading";
import { VscAccount } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import Dropzone from "react-dropzone";
import { showToast } from "@/helper/showToast";
import { setUser } from "@/redux/user/user.slice";
import {  useNavigate } from "react-router-dom";
import { RouteIndex } from "@/helper/RouteName";
import userIcon from "../assets/images/user.png"

export default function Profile() {
  const [filePreview, setFilePreview] = useState();
  const [file,setFile] = useState()

  const user = useSelector((state) => state.user);

  const {
    data: userData,
    error,
    loading,
  } = useFetch(
    `${getEnv("VITE_API_BASE_URL")}/api/user/get-user/${user.user._id}`,
    { method: "get", credentials: "include" }
  );

  const Navigate = useNavigate()
  const dispatch = useDispatch();

  const formSchema = z.object({
    name: z.string().min(3, "Name must be 3 character long."),
    email: z.string().email(),
    bio: z.string().min(3, "Bio must be 3 character long."),
    password:z.string().optional()
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      bio: "",
      password: "",
    },
  });

  useEffect(() => {
    if (userData && userData.success) {
      form.reset({
        name: userData.user.name,
        email: userData.user.email,
        bio: userData.user.bio,
      });
    }
  }, [userData]);

  async function onSubmit(values) {
    try {

      const formData = new FormData()

    
      if(file){
         formData.append("file",file)
         showToast("error","Featured Image is required")
      }

     
      formData.append("data",JSON.stringify(values))

      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/api/user/update-user/${userData.user._id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message);
      }
      dispatch(setUser(data.user));
      Navigate(RouteIndex);
      showToast("success", data.message);
    } catch (err) {
      showToast("error", err.message);
    }
  }

  const handleFileSelection = (file) => {
    const files = file[0]
    const preview = URL.createObjectURL(files);
    setFile(files)
    setFilePreview(preview);
  };

  if (loading) return <Loading />;
  return (
    <Card className="max-w-screen-md mx-auto">
      <CardContent>
        <div className="flex justify-center items-center">
          <Dropzone
            onDrop={(acceptedFiles) => handleFileSelection(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Avatar className="w-20 h-20 relative group">
                  {userData?.user?.avatar ? (
                    <AvatarImage
                      src={filePreview ? filePreview : userData.user.avatar}
                      alt="User Avatar"
                    />
                  ) : (
                    <VscAccount className="w-full h-full text-gray-500 p-2" />
                  )}
                  <div className="absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  justify-center items-center  bg-opacity-20 border-4 border-orange-400 rounded-full group-hover:flex hidden">
                    <MdOutlineCameraAlt color="oklch(0.705 0.213 47.604)" />
                  </div>
                </Avatar>
              </div>
            )}
          </Dropzone>
        </div>

        <div>
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
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your email..."
                          {...field}
                        />
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
                        <Input placeholder="Enter your email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
}
