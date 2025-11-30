import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RouteAddBlog,RouteEditBlog } from "@/helper/RouteName";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helper/getEnv";
import moment from "moment";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteData } from "@/helper/handelDelete";
import { showToast } from "@/helper/showToast";
import Loading from "@/components/Loading";
import { useState } from "react";

export default function BlogDetails(){

  const {blogid} = useParams()

  const [refresh,setRefresh] = useState(false)

  const {data:blogData,loading:blogLoading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/get-all`,{
    method:"GET",
    credentials:"include"
  },[refresh])


  const handleDelete = async(id)=>{
    const response = await deleteData(`${getEnv("VITE_API_BASE_URL")}/api/blog/delete/${id}`)

    if(response){
      showToast("success","Blog deleted successfully")
      setRefresh(!refresh);
    }else{
      showToast("error","Blog not deleted")
    }
  }

   if (blogLoading) return <Loading />;
    return(
         <div>
      <Card>
        <CardHeader>
          {/* <h2 className="font-bold mb-5">Manage Blogs</h2> */}
          <div className="flex justify-between items-center">
            <h2 className="font-bold mb-5">Manage Blogs</h2>
            <Button>
              <Link to={RouteAddBlog}>Add Blog</Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table  className="w-full table-fixed text-sm">
            <TableHeader>
              <TableRow>
                <TableHead className="md:whitespace-normal break-words">Author</TableHead>
                <TableHead className="whitespace-normal break-words">Category Name</TableHead>
                <TableHead className="whitespace-normal break-words">Title</TableHead>
                <TableHead className="whitespace-normal break-words">Slug</TableHead>
                <TableHead className="whitespace-normal break-words">Dated</TableHead>
                <TableHead className="whitespace-normal break-words">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogData && blogData.blog.length >= 0 ? (
                <>
                  {blogData.blog.map((blog) => (
                    <TableRow key={blog?._id}>
                      <TableCell className="whitespace-normal break-words">{blog?.author.name}</TableCell>
                      <TableCell className="whitespace-normal break-words">{blog?.category.name}</TableCell>
                      <TableCell className="whitespace-normal break-words">{blog?.title}</TableCell>
                      <TableCell className="whitespace-normal break-words">{blog?.slug}</TableCell>
                      <TableCell>{moment(blog.createdAt).format("DD-MM-YYYY")}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          className="hover:bg-amber-600 hover:text-white"
                        >
                          <Link to={RouteEditBlog(blog._id)}>
                            <FaRegEdit />
                          </Link>
                        </Button>
                        <Button
                          onClick={() => handleDelete(blog._id)}
                          variant="outline"
                          className="hover:bg-amber-600 hover:text-white"
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan="3">Data not found!</TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
    
}