
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RouteAddBlog, RouteAddCategory, RouteBlog, RouteBlogByCategory, RouteBlogDetails, RouteCategoryDetails, RouteCommentDetails,  RouteEditBlog, RouteEditCategory, RouteIndex, RouteProfile, RouteSearch, RouteSignIn, RouteSignUp, RouteUsers } from './helper/RouteName'
import Index from './pages'
import Layout from './layout/Layout'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import AddCategory from './pages/Categories/AddCategory'
import EditCategory from './pages/Categories/EditCategory'
import CategoryDetails from './pages/Categories/CategoryDetails'
import AddBlog from './pages/Blog/AddBlog'
import BlogDetails from './pages/Blog/BlogDetails'
import EditBlog from './pages/Blog/EditBlog'
import SingleBlogDetail from './pages/singleBlogDetail'
import BlogByCategory from './components/BlogByCategory'
import SearchResult from './components/SearchResult'
import CommentDetails from './pages/CommentDetails'
import Users from './pages/Users'
import AuthRouteProtection from './components/AuthRouteProtection'
import AllowedAdminOnly from './components/AllowedAdminOnly'

function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path={RouteIndex} element={<Layout/>}>
      <Route index element={<Index/>}/>

      
      
      <Route path={RouteBlogDetails()} element={<SingleBlogDetail/>}/>
      <Route path={RouteBlogByCategory()} element={<BlogByCategory/>}/>
      <Route path={RouteSearch()} element={<SearchResult/>}/>


      <Route element={<AuthRouteProtection/>}>
      <Route path={RouteAddBlog} element={<AddBlog/>}/>
       <Route path={RouteEditBlog()} element={<EditBlog/>}/>
      <Route path={RouteBlog} element={<BlogDetails/>}/>
      <Route path={RouteCommentDetails} element={<CommentDetails/>}/>
      <Route path={RouteProfile} element={<Profile/>}/>
      </Route>

      <Route element={<AllowedAdminOnly/>}>
         <Route path={RouteUsers} element={<Users/>}/>
          <Route path={RouteEditCategory()} element={<EditCategory/>}/>
      <Route path={RouteCategoryDetails} element={<CategoryDetails/>}/>
      <Route path={RouteAddCategory } element={<AddCategory/>}/>
       <Route path={RouteUsers} element={<Users/>}/>
      </Route>

      </Route>


      <Route path={RouteSignIn} element={<SignIn/>}/>
      <Route path={RouteSignUp} element={<SignUp/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
