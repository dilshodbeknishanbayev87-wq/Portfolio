import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp.jsx";
import Login from "./components/Login/Login.jsx";
import ResetPassword from "./components/ResetPass/ResetPass.jsx";
import Home from "./components/Home/Home.jsx"; 
import Profile from "./components/Profile/Profile.jsx";
import Post from "./components/Post/Post.jsx";
import Search from "./components/Search/Search.jsx";
// import Comment from "./components/Comment/Comment.jsx";


function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>  
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post" element={<Post />} />
        <Route path="/search" element={<Search />} />
        {/* <Route path="/comment" element={<Comment/>}>
        
        </Route> */}
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
