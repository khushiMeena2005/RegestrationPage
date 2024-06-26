import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { authActions } from './../store/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials=true;

let firstRender=true;

const Hero = () => {
const dispatch=useDispatch();
const navigate= useNavigate();
const [user,setUser]=useState(); 


    const sendLogOutReq=async()=> {
          const res= await axios.post("http://localhost:3001/api/logout",null,{
             withCredentials:true
          });
          if(res.status===200){
              return res;
          }
             return new Error("Unable to Logout.Please try again");
       }
     

  const handleLogout=()=>{
     sendLogOutReq().then(()=>dispatch(authActions.logout())).then(()=>navigate("/login"))
  }



   const refreshToken=async()=>{
       const res=await axios.get("http://localhost:3001/api/refresh",{
        withCredentials:true
       }).catch(err=>console.log(err))

       const data=await res.data;
       return data;
   } 

  const sendRequest= async()=>{
      const res= await axios.get("http://localhost:3001/api/user",{
          withCredentials:true
      }).catch(err=>console.log(err));

      const data = await res.data;
      console.log(data);
      return data;
  }

  useEffect(()=>{
    if(firstRender){
        sendRequest().then((data)=>setUser(data.user));
        firstRender=false;
    }
     let interval=setInterval(()=>{
      refreshToken().then(data=>setUser(data.user))
     },1000*29)

     return ()=>clearInterval(interval)
  },[])

  return (
    <>
      <div className='welcomeGreeting'>
       {user && <h1> Welcome {user.name}🤗</h1>}
       <button onClick={handleLogout} >LogOut</button>
    </div>
    </>
  )
}

export default Hero