import { FcGoogle } from "react-icons/fc";
import { Button } from "./ui/button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helper/firebase";
import { getEnv } from "@/helper/getEnv";
import { showToast } from "@/helper/showToast";
import { RouteIndex } from "@/helper/RouteName";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/user/user.slice";


export default function GoogleLogin(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async ()=>{
        const googleResponse = await signInWithPopup(auth,provider);
       const user = googleResponse.user;
       const resBody = {
        name:user.displayName,
        email:user.email,
        avatar:user.photoURL,
       }
        try{
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/api/auth/google-login`, {
                method:"POST",
                headers:{"Content-type":"application/json"},
                credentials:"include",
                body:JSON.stringify(resBody)
            })

            const data = await response.json();
            if(!response.ok){
               return showToast("error",data.message)
            }
            dispatch(setUser(data.user))
            navigate(RouteIndex)
            showToast("success",data.message)
        }catch(err){
            showToast("error",err.message);
        }
    }
    return(
        <div>
            <Button variant="outline" className="w-full" onClick={handleLogin}>
                <FcGoogle/>
                Continoue with Google
            </Button>
        </div>
    )
}