import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {  Link } from "react-router-dom";
import logo from "@/assets/images/IdeaOrbit_logos.png"
import { MdOutlineHome } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";
import { FaRegComments } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { BiCategory } from "react-icons/bi";
import { GoDot } from "react-icons/go";
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUsers } from "@/helper/RouteName";
import { useFetch } from "@/hooks/useFetch";
import { getEnv } from "@/helper/getEnv";
import { useSelector } from "react-redux";

export default function AppSidebar() {

  const user = useSelector((state) =>state.user)
  const {data:categoryData,loading,error} = useFetch(`${getEnv("VITE_API_BASE_URL")}/api/category/all-category`,{
    method:"GET",
    credentials:"include"
  })

  return (

      <Sidebar>
        <SidebarHeader>
          <img src={logo} alt="" width={120}/>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup >
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton>
                  <MdOutlineHome/>
                    <Link to={RouteIndex}>Home</Link>
                </SidebarMenuButton>

            </SidebarMenuItem>

                {user && user.isLoggedIn ?
                <>
                        <SidebarMenuItem>
                <SidebarMenuButton>
                  <LiaBlogSolid/>
                    <Link to={RouteBlog}>Blogs</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton>
                  <FaRegComments/>
                    <Link to={RouteCommentDetails}>Commetns</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
                </>
                :
                <></>
              }

              {user && user.isLoggedIn && user.user.role === "admin" ?
              <>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BiCategory/>
                    <Link to={RouteCategoryDetails}>Categories</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
     
             <SidebarMenuItem>
                <SidebarMenuButton>
                  <FiUsers/>
                    <Link to={RouteUsers}>Users</Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
              </>
              :
              <></>
            }
             
          </SidebarMenu>
          </SidebarGroup >


          <SidebarGroup >
            <SidebarGroupLabel>
              Categories
            </SidebarGroupLabel>
          <SidebarMenu>
           
              {categoryData && categoryData.category.length > 0 && 
              categoryData.category.map((category)=>(
                 <SidebarMenuItem key={category._id}>
                <SidebarMenuButton>
                  <GoDot/>
                    <Link to={RouteBlogByCategory(category.slug)}>{category.name}</Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            
  
          </SidebarMenu>
          </SidebarGroup >
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
  
  );
}
