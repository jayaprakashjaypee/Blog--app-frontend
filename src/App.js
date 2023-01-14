import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import AddBlog from "./pages/AddBlog";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import EditBlog from "./pages/EditBlog";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  return (
    <BrowserRouter>
      <>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signIn" element={<Register />}></Route>
          <Route
            path="/addBlog"
            element={
              <PrivateRoute>
                <AddBlog />
              </PrivateRoute>
            }
          ></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/EditBlog/:id"
            element={
              <PrivateRoute>
                <EditBlog />
              </PrivateRoute>
            }
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
