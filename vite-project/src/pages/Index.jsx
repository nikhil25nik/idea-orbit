import BlogCard from "@/components/BlogCard"
import Loading from "@/components/Loading";
import { getEnv } from "@/helper/getEnv"
import { useFetch } from "@/hooks/useFetch"

export default function Index(){
    const {data:blogData,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/blogs`,{
        method:"GET",
        credentials:"include"
    })
  if (loading) return <Loading />;
    return(
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 ">

            {blogData && blogData.blog.length > 0 ?
                blogData.blog.map((blog)=>(
                    <BlogCard key={blog._id} props= {blog}/>
                )) :
                <><div>Data not Found</div></>
            }
            
        </div>
    )
}