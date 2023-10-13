import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import HomePage from "./pages/HomePage/HomePage"
import Login from "./pages/AuthPages/Login/Login"
import Register from "./pages/AuthPages/Register/Register"
import DashboardPage from "./pages/DashboardPage/DashboardPage"

import { checkIsLoggedIn } from "./redux/actionCreators/authActionCreater"

const App = () => {
    const dispatch = useDispatch();


    useEffect(() => {
      dispatch(checkIsLoggedIn())
    }, [])


  return (
    <>
      <div className="App">  
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard/*" element={<DashboardPage/>}/> 
        </Routes>
      </div>
    </>
  )
}

export default App
