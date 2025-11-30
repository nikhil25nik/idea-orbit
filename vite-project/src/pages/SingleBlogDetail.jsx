import Loading from "@/components/Loading"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { getEnv } from "@/helper/getEnv"
import { useFetch } from "@/hooks/useFetch"
import { useParams } from "react-router-dom"
import { decodeHTML } from "entities"
import Comments from "@/components/Comments"
import CommentLists from "@/components/CommentLists"
import CommentCount from "@/components/CommentCount"
import moment from "moment"
import LikeCount from "@/components/LikeCount"
import ReactMarkdown from "react-markdown";
import ReletedBlogs from "@/components/ReletedBlogs"
import userIcon from "../assets/images/user.png"
export default function SingleBlogDetail(){

    const {blog,category} = useParams()
    const {data,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/blog/get-blog/${blog}`,{
        method:"GET",
        credentials:"include"
    },[blog,category])

  
    if(loading) return <Loading/>
    return(
        <div className="md:flex-nowrap flex-wrap flex justify-between gap-20">
            {data && data.blog && 
            <>
            <div className="border rounded  md:w-[70%] p-5 ">
                <h1 className="text-2xl font-bold mb-5 whitespace-normal break-words">{data.blog.title}</h1>
            <div className="flex justify-between items-center">
                <div className="flex justify-between items-center gap-2">
                    <Avatar>
                        <AvatarImage src={data.blog.author.avatar || userIcon }/>
                    </Avatar>
                    <div>
                    <span className="font-bold ">{data.blog.author.name}</span>

                    <p className="text-sm">Date {moment(data.blog.createdAt).format("DD-MM-YYYY")}</p>
                    </div>
               
                </div>
                <div className="flex justify-between items-center gap-5">
                    <LikeCount blogid={data.blog._id}/>
                    <CommentCount blogid={data.blog._id}/>
                </div>
            </div>

              
       

            <div className="my-5">
                <img src={data.blog.featuredImage} alt="" className="rounded"/>
            </div>
       <div 
                className="prose prose-neutral prose-img:rounded max-w-none" 
               
            >
                <ReactMarkdown>{data.blog.blogContent || ""}</ReactMarkdown>
            </div>
            <div className="border-t mt-5 mb-5">
                <Comments props={{blogid:data.blog._id}}/>
            </div>
            
            </div>
            
            </>
            }
            <div className="border rounded md:w-[30%] p-5">
                <ReletedBlogs props={{category:category,currenBlog:blog}}/>
            </div>
        </div>
    )
}