import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  RouteAddBlog,
  RouteAddCategory,
  RouteBlog,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteCategoryDetails,
  RouteCommentDetails,
  RouteEditBlog,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignIn,
  RouteSignUp,
  RouteUsers,
} from "./helper/RouteName";


import Index from "./pages/Index.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";


import AddCategory from "./pages/Categories/AddCategory.jsx";
import EditCategory from "./pages/Categories/EditCategory.jsx";
import CategoryDetails from "./pages/Categories/CategoryDetails.jsx";


import AddBlog from "./pages/Blog/AddBlog.jsx";
import BlogDetails from "./pages/Blog/BlogDetails.jsx";
import EditBlog from "./pages/Blog/EditBlog.jsx";
import SingleBlogDetail from "./pages/SingleBlogDetail.jsx"; 



import BlogByCategory from "./components/BlogByCategory.jsx";
import SearchResult from "./components/SearchResult.jsx";
import AuthRouteProtection from "./components/AuthRouteProtection.jsx";
import AllowedAdminOnly from "./components/AllowedAdminOnly.jsx";

import CommentDetails from "./pages/CommentDetails.jsx";
import Users from "./pages/Users.jsx";


import Layout from "./layout/Layout.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Index />} />

    
            <Route path={RouteBlogDetails()} element={<SingleBlogDetail />} />
            <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
            <Route path={RouteSearch()} element={<SearchResult />} />

    
            <Route element={<AuthRouteProtection />}>
              <Route path={RouteAddBlog} element={<AddBlog />} />
              <Route path={RouteEditBlog()} element={<EditBlog />} />
              <Route path={RouteBlog} element={<BlogDetails />} />
              <Route path={RouteCommentDetails} element={<CommentDetails />} />
              <Route path={RouteProfile} element={<Profile />} />
            </Route>

      
            <Route element={<AllowedAdminOnly />}>
              <Route path={RouteUsers} element={<Users />} />
              <Route path={RouteEditCategory()} element={<EditCategory />} />
              <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
              <Route path={RouteAddCategory} element={<AddCategory />} />
            </Route>
          </Route>

    
          <Route path={RouteSignIn} element={<SignIn />} />
          <Route path={RouteSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
