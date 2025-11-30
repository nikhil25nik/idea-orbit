import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { flattenError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { getEnv } from "@/helper/getEnv.js";
import { showToast } from "@/helper/showToast.js";
import { useEffect, useState } from "react";
import slugify from "slugify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch.js";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RouteAddBlog, RouteBlog } from "@/helper/RouteName";
import Loading from "@/components/Loading";

export default function AddBlog() {

  const user = useSelector((state)=> state.user);
  const Navigate = useNavigate()

  const [isSubmitting,setIsSubmitting] = useState(false)
    const [filePreview , setFilePreview] = useState()
    const [file,setFile] = useState()
  const {
    data: categoryData,
    loading:blogLoading,
    error,
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/category/all-category`, {
    method: "GET",
    credentials: "include",
  });


  const formSchema = z.object({
    category: z.string().min(3, "category must be 3 character long"),
    title: z.string().min(3, "title must be 3 character long."),
    slug: z.string().min(3, "name must be 3 character long."),
    blogContent: z.string().min(3, "blog content must be 3 character long"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      title: "",
      slug: "",
      blogContent: "",
    },
  });

  const handleEditorData = (event,editor) => {
  

  const data = editor.getData()
  form.setValue("blogContent", data);


};
  const blogTitle = form.watch("title");
  useEffect(() => {
    if (blogTitle) {
      const slug = slugify(blogTitle, { lower: true });
      form.setValue("slug", slug);
    }
  }, [blogTitle]);

  async function onSubmit(values) {

    try{
      setIsSubmitting(true)
      const newValues = {...values, author:user.user._id}
      const formData = new FormData();
      formData.append("file",file)
      formData.append("data",JSON.stringify(newValues))

      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/add`,{
        method:"POST",
        credentials:"include",
        body:formData
      })

      const data = await response.json();
      if(!response.ok){
        return showToast("error",data.message)
      }
     
      form.reset()
      setFile()
      setFilePreview()
      showToast("success",data.message)
       Navigate(RouteBlog)
    }catch(err){
      showToast("error",err.message)
    }finally{
      setIsSubmitting(false)
    }
  }

    const handleFileSelection = (file) => {
    const files = file[0]

    const preview = URL.createObjectURL(files);
    setFile(files)
    setFilePreview(preview);
  };
    if(blogLoading) return <Loading/>
  return (
    <div>

      {/* Optional full-page loader while submitting */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}
      <Card className="pt-5">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {categoryData &&
                                categoryData.category.length > 0 &&
                                categoryData.category.map((category) => (
                                  <SelectItem
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>slug</FormLabel>
                      <FormControl>
                        <Input placeholder="slug is auto genrate here..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image</FormLabel>
                      <FormControl>
                        <Dropzone
                          onDrop={(acceptedFiles) =>
                            handleFileSelection(acceptedFiles)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <div className=" flex justify-center items-center w-36 h-28 border-2 border-dashed rounded">
                              <img  src={filePreview} alt="" className="h-full w-full object-cover cursor-pointer"/>

                              </div>
                            </div>
                          )}
                        </Dropzone>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="mb-3">
                <FormField
                  control={form.control}
                  name="blogContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Content</FormLabel>
                      <FormControl >
                        <div className="flex w-full">
                        <Editor className="flex justify-start w-full" props={{initialData:"",onChange:handleEditorData}} />

                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full">
                Add
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
