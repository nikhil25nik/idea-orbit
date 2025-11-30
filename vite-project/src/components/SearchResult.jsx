import { getEnv } from "@/helper/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "react-router-dom"
import BlogCard from "./BlogCard";
import Loading from "./Loading";

export default function SearchResult(){
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q");

    const {data,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/search?q=${q}`,{
        method:"GET",
        credentials:"include"
    })

  if (loading) return <Loading />;
    return(
        <>
        <div className="flex items-center gap-3 text-2xl font-bold text-orange-500 border-b pb-2 mb-5 ">
            <h4>Search Result For : {q}</h4>
        </div>
        <div  className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {data && data.blog.length > 0 
            ?
            data.blog.map((blog)=>(
                <BlogCard key={blog._id} props={blog}/>
            ))
            :
            <div>Data Not Found!</div>
        }
        </div>
        </>
    )
}