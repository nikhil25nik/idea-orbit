import { RouteSignIn } from "@/helper/RouteName"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

export default function AuthRouteProtection(){

    const user = useSelector(state => state.user)

    if(user && user.isLoggedIn){
        return(
            <Outlet/>
        )
    }else{
        return(
            <Navigate to={RouteSignIn}/>
        )
    }
}