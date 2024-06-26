import React from 'react'
import "./App.css"
import { Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector } from "react-redux";
import Login from './components/Login'
import SignUp from './components/SignUp'
import Hero from "./components/Hero"


const App = () => {
 
  const isLoggedIn=useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <React.Fragment> 
    
      <Routes>
        <Route  path='/'  element={<SignUp/>} />
        <Route   path='/login' element={<Login />} />
        <Route   path='/signup' element={<SignUp />} />
        <Route path='/hero' element={<Hero/>} />
      </Routes>
    
      <ToastContainer/>
     </React.Fragment>
  )
}


export default App

