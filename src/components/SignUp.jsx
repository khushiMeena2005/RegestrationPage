import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {

 const [name , setName]= useState('');
 const [email , setEmail]=useState('');
 const [password, setPassword]=useState('');
 const navigate = useNavigate();

 const handleSubmit = async(e)=>{
   e.preventDefault();
   
  await  axios.post('http://localhost:3001/api/signup',{name,email,password})
    .then(res =>{
      if(res.data.success===true){
        toast.success(res.data.message);
         navigate('/login') 
      }else{
      toast.error(res.data.message);
      }
      
    })
    .catch(err =>console.log(err))
     
 }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} id="form">
      <h1>Register Here</h1>
        <div  className="input-group">
          <label htmlFor="email">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
           
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
          
            name="email"
            value={email}
             onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">
            <strong>Password</strong>
          </label>
          <input type="password" placeholder="Enter Password" name="password" 
          value={password}
             onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Sign Up</button>
          <p>Already Have an account ?  <a href="/login">Login</a></p>
         
      </form>
   
    </div>
  );
};

export default SignUp;
