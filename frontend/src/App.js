import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/home.jsx";
import AllTask from "./pages/AllTask.jsx";
import CompletedTask from "./pages/Completed.jsx";
import ImportantTask from "./pages/ImportantTasks.jsx";
import IncompleteTask from "./pages/Incomplete.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth.js";


const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const  isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    else if(isLoggedIn===false){
      navigate("/signup");
    }
  },[]);

  return (
    <>
      <div className="bg-gray-900 text-white h-screen p-2 relative">
          <Routes>
            <Route exact path="/" element={<Home />}>
              <Route index element={<AllTask />}></Route>
              <Route path="/importantTasks" element={<ImportantTask />}></Route>
              <Route path="/completeTasks" element={<CompletedTask />}></Route>
              <Route path="/incompleteTasks" element={<IncompleteTask />}></Route>
            </Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
      </div>
    </>
  );
};

export default App;
