import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminRoutes } from "./components/admin-routes";
import { AuthRoutes } from "./components/auth-routes";
import { PrivateRoutes } from "./components/private-routes";
import Layout from "./layouts";
import About from "./pages/about";
import Dashboard from "./pages/admin/dashboard";
import Posts from "./pages/admin/posts";
import EditPost from "./pages/admin/posts/edit";
import New from "./pages/admin/posts/new";
import Users from "./pages/admin/users";
import Home from "./pages/home";
import Login from "./pages/login";
import Post from "./pages/posts/slug";
import Profile from "./pages/profile";
import Signup from "./pages/signup";
import Test from "./pages/test";
import Search from "./pages/posts/search";
import NotFound from "./pages/not-found";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts/:slug" element={<Post />} />
          <Route path="/posts/search" element={<Search />} />
          <Route path="/test" element={<Test />} />
          {/* Auth Routes */}
          <Route element={<AuthRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          {/* Private Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* Admin Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/posts" element={<Posts />} />
            <Route path="/admin/posts/new" element={<New />} />
            <Route path="/admin/posts/:id/edit" element={<EditPost />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
