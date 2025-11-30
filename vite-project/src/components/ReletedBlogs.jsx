import { getEnv } from "@/helper/getEnv"
import { RouteBlogDetails } from "@/helper/RouteName"
import { useFetch } from "@/hooks/useFetch"
import { Link } from "react-router-dom"
import Loading from "./Loading"

export default function ReletedBlogs({props}){

    const {data,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/get-releted-blog/${props.category}/${props.currentBlog}`,{
        method:"GET",
        credentials:"include"
    })
  if (loading) return <Loading />;
    return(
        <div>
            <h2 className="text-2xl font-bold">Releted Blogs</h2>
           <div className="mt-4">
  {data?.reletedBlog?.length > 0 ? (
    data.reletedBlog.map((blog) => (
        <Link key={blog._id} to={RouteBlogDetails(props.category,blog.slug)}>
      <div
        key={blog._id}
        className="flex items-center gap-3 mb-3 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
      >
        <img
          className="w-[100px] h-[60px] object-cover rounded-md"
          src={blog.featuredImage}
          alt={blog.title}
        />
        <h4 className="line-clamp-1 text-lg font-semibold">{blog.title}</h4>
      </div>
        </Link>
    ))
  ) : (
    <div className="text-gray-500">No data available</div>
  )}
</div>
        </div>
    )
}