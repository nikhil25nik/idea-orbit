import { getEnv } from "@/helper/getEnv"
import { useFetch } from "@/hooks/useFetch"
import { useParams } from "react-router-dom";
import BlogCard from "@/components/BlogCard"
import { BiCategory } from "react-icons/bi";
import Loading from "./Loading";
export default function BlogByCategory(){
    const {category} = useParams()

    const {data,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/get-blog-by-category/${category}`,{
        method:"GET",
        credentials:"include"
    },[category])

     if (loading) return <Loading />;
    return(

        <>
        <div className="flex items-center gap-3 mb-4 text-2xl font-bold text-orange-500 border-b pb-3">
            <BiCategory/>
            <h4>{data && data?.categoryData?.name }</h4>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {data && data.blogCategory.length > 0 ?
            data.blogCategory.map((blog)=>(
                <BlogCard key={blog._id} props={blog}/>
            ))
            :
            <div>Data Not Found</div>
        }
        </div>
        </>
    )
}