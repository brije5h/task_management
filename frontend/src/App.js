import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import AllTask from "./pages/AllTask.jsx";
import CompletedTask from "./pages/Completed.jsx";
import ImportantTask from "./pages/ImportantTasks.jsx";
import IncompleteTask from "./pages/Incomplete.jsx";
import Cards from "./components/Cards.jsx";
import InputData from "./components/inputData.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./Login.jsx";

const App = () => {
  return (
    <>
      <div className="bg-gray-900 text-white h-screen p-2 relative">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />}>
              <Route index element={<AllTask />}></Route>
              <Route path="/importantTasks" element={<ImportantTask />}></Route>
              <Route path="/completeTasks" element={<CompletedTask />}></Route>
              <Route path="/incompleteTasks" element={<IncompleteTask />}></Route>
            </Route>
            <Route path="/test" element={<Cards />}></Route>
            <Route path="/test2" element={<InputData />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/test3" element={<ImportantTask />}></Route>
            <Route path="/test4" element={<IncompleteTask />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
