import React, { useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authActions } from '../store';
const Login = () => {
  
  const  dispatch=useDispatch();
  
   const [email , setEmail]=useState('');
 const [password, setPassword]=useState('');
 const navigate = useNavigate();

  const handleSubmit= async(e)=>{
       e.preventDefault();
   await axios.post('http://localhost:3001/api/login',{email,password})
       .then(res=>{
             if(res.data.success ===true){
              dispatch(authActions.login())
               toast.success(res.data.message);
             
              navigate('/hero');
             }else{
              toast.error(res.data.message);
             navigate("/login");
             }
            
        })
      .catch(err =>console.log(err))

  }

  return (
    <div className="container">
   
      <form onSubmit={handleSubmit} id="form">
       <h1>Login Here</h1>
        <div className="input-group">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="text"
            placeholder="Enter email"
           
            name="email"
            value={email}
              onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            
            name="password"
            value={password}
             onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
          <button type='submit'>Login</button>
           <p> Or Create Account ! <a href="/signup">Register</a></p>
        </form>
      
            </div>
  )
}

export default Login
