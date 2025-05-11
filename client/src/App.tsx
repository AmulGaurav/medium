import "./App.css";
import { Routes, Route } from "react-router";
import Blog from "./pages/Blog";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

function App() {
  return (
    <Routes>
      <Route index element={<Blog />} />
      {/* <Route path="about" element={<About />} /> */}

      {/* <Route element={<AuthLayout />}> */}
      <Route path="login" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      {/* </Route> */}

      <Route path="blogs">
        <Route index element={<Blog />} />
        {/* <Route path=":city" element={<City />} />
        <Route path="trending" element={<Trending />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
