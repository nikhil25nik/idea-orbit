import logo from "@/assets/images/IdeaOrbit_logos.png"
import { Button } from "./ui/button"
import { Link, useNavigate } from "react-router-dom"
import { FiLogIn } from "react-icons/fi";
import Searchbar from "./SearchBar";
import { RouteAddBlog, RouteIndex, RouteProfile, RouteSignIn } from "@/helper/RouteName";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VscAccount } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { getEnv } from "@/helper/getEnv";
import { showToast } from "@/helper/showToast";
import { removeUser } from "@/redux/user/user.slice";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSidebar } from "./ui/sidebar";
import userIcon from "../assets/images/user.png"




export default function Topbar(){
const { toggleSidebar } = useSidebar()
    const [showSearch,setShowSearch] = useState(false)
    const user = useSelector((state) =>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    let handleLogout = async()=>{

        try{
            const response = await fetch(`${getEnv('VITE_API_BASE_URL')}/api/auth/logout`,{
                method:"GET",
                credentials:"include",
            })
            const data = await response.json();
            if(!response.ok){
            return showToast("error",error.message)
            }
            dispatch(removeUser())
            navigate(RouteIndex)
            showToast("success",data.message)
        }catch(err){
            showToast("error",err.message)
        }

    }
const toToggleSearch = ()=>{
  setShowSearch(!showSearch)
}
    return(
        <div className="flex justify-between items-center h-16 fixed w-full z-20 px-5 border-b bg-white">
            <div className="flex justify-center items-center gap-2">
    <button onClick={toggleSidebar} className="md:hidden" type="button">
        <GiHamburgerMenu size={20}/>
    </button>
    <Link to={RouteIndex}>
                <img src={logo} alt="" width={120} />
    </Link>
            </div>
            <div className="w-[500px]">

              <div className={`md:relative md:block absolute bg-white left-0 w-full md:top-0 top-16 md:p-0 p-5 ${showSearch ? "block":"hidden"}`}>
                <Searchbar/>

              </div>
            </div>
            <div className="flex items-center gap-5 "> 
                <button onClick={toToggleSearch} type="button">
                    <IoSearchSharp size={30} className="md:hidden block"/>
                </button>
                {!user.isLoggedIn ? <Button asChild className="rounded-full">
                    <Link to={RouteSignIn}> <FiLogIn/> Sign In</Link>
                </Button>: 
                <>
                <DropdownMenu className="cursor-pointer">
  <DropdownMenuTrigger>
    <Avatar>
  <AvatarImage src={user.user.avatar || userIcon}  />
  <AvatarFallback><VscAccount/></AvatarFallback>
</Avatar>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>
        <p>{user.user.name}</p>
        <p className="text-sm">{user.user.email}</p>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
    </DropdownMenuItem>
    <DropdownMenuItem asChild className="cursor-pointer">
    <Link to={RouteProfile}>
    
        <MdOutlineAccountCircle/>
        Profile
    </Link>
        </DropdownMenuItem>
    <DropdownMenuItem asChild className="cursor-pointer">
    <Link to={RouteAddBlog}>
        <FaPlus/>
        Create Blog
    </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
        <RiLogoutBoxRLine color="red"/>
        Logout
        </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
                </>}
                
            </div>
        </div>
    )
}