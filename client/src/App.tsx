import "./App.css";
import { Routes, Route } from "react-router";
import { ThemeProvider } from "./context/themeProvider";
import Navbar from "./components/Navbar";
import Blog from "./pages/Blog";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Routes>
        <Route index element={<Blog />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route path="blogs">
          <Route index element={<Blog />} />
          {/* <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} /> */}
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
