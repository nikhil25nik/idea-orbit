import { getEnv } from "@/helper/getEnv";
import { showToast } from "@/helper/showToast";
import { useFetch } from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";


export default function LikeCount({blogid}){
    const [likeCount,setLikeCount] = useState(0);
    const [hasLiked,setHasLiked] = useState(false)

    let user = useSelector((state)=>state.user)
    const userid = user?.isLoggedIn ? user.user._id : "null";
    const {data:blogLikes,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/like/get-like/${blogid}/?userid=${userid}`,{
        method:"GET",
        credentials:"include"
    })


    useEffect(()=>{
        if(blogLikes){
            setLikeCount(blogLikes.likeCount)
            setHasLiked(blogLikes.isUserLiked)
        }
    },[blogLikes])
    const handleLike = async()=>{

        try {
            if(!user.isLoggedIn){
                showToast("error","You must be logged in.")
                return
            }

            let response = await fetch(`${getEnv("VITE_API_BASE_URL")}/api/like/do-like`,{
                method:"POST",
                headers:{"Content-type":"application/json"},
                credentials:"include",
                body: JSON.stringify({user:user.user._id, blogid:blogid})
            })
            
            if(!response.ok){
                showToast("error",response.statusText)
            }
            const responseData = await response.json();
            
        setLikeCount(responseData.likeCount)
        setHasLiked(!hasLiked)
        } catch (error) {
            showToast("error",error.message);
        }
    }
    return(
        <button onClick={handleLike} type="button" className="flex items-center justify-center gap-2">
            {hasLiked ?
            <FaHeart fill="red" className="cursor-pointer"/>
            :
            <FaRegHeart className="cursor-pointer"/>
            }
            {likeCount}
        </button>
    )
}