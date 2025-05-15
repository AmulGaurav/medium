import "./App.css";
import { Routes, Route } from "react-router";
import { ThemeProvider } from "./context/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import Blogs from "./pages/Blogs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NewBlog from "./pages/NewBlog";
import Blog from "./pages/Blog";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />

      <Routes>
        <Route index element={<Blogs />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="blogs" element={<Blogs />} />

        <Route path="blog">
          <Route path="publish" element={<NewBlog />} />
          <Route path=":blogId" element={<Blog />} />
        </Route>
      </Routes>

      <Toaster closeButton />
    </ThemeProvider>
  );
}

export default App;
