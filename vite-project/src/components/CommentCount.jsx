import { getEnv } from "@/helper/getEnv";
import { useFetch } from "@/hooks/useFetch";
import { FaRegComment } from "react-icons/fa";

export default function CommentCount({blogid}){

    const {data,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/comment/get-count/${blogid}`,{
        method:"GET",
        credentials:"include"
    })
  
    const count = data?.commentCount ?? 0;
    return(
        <div className="flex justify-between items-center gap-2">
            <FaRegComment/>
            {count}
        </div>
    )
}