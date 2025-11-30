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
import { z } from "zod";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks/useFetch.js";
import Dropzone from "react-dropzone";
import Editor from "@/components/Editor";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  RouteBlog } from "@/helper/RouteName";
import { decode } from "entities";
import Loading from "@/components/Loading";

export default function EditBlog() {

    const {blogid} = useParams()

  const user = useSelector((state)=> state.user);
  const Navigate = useNavigate()

    
    const [filePreview , setFilePreview] = useState()
    const [file,setFile] = useState()
  const {
    data: categoryData
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/category/all-category`, {
    method: "GET",
    credentials: "include",
  });

    const {
    data: blogData,loading:blogLoading
  } = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/edit/${blogid}`, {
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

  useEffect(()=>{
    if(blogData){
        form.setValue("category",blogData.blog.category._id)
        form.setValue("title",blogData.blog.title)
        form.setValue("slug",blogData.blog.slug)
        form.setValue("blogContent", decode(blogData.blog.blogContent))
        setFilePreview(blogData.blog.featuredImage)
        
    }
  },[blogData])

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
      
      const formData = new FormData();
      formData.append("file",file)
      formData.append("data",JSON.stringify(values))

      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/update/${blogid}`,{
        method:"PUT",
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
                        <Select onValueChange={field.onChange} value={field.value}>
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
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your Slug..." {...field} />
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
                        <Editor className="flex justify-start w-full"  key={field.value} props={{initialData: field.value,onChange:handleEditorData}} />

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
