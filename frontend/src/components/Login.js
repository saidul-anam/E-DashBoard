import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Login=()=>{
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    let navigate=useNavigate()
    useEffect(()=>{
        let auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
      })
    const handlelogin=async()=>{
        console.warn(email,password);
         let result=await fetch('http://localhost:5000/login',{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
         })
         console.log("i am here in frontend2")
         result=await result.json();
         console.warn(result)
         if(result.auth){
            console.log("i am here in frontend2")
                  localStorage.setItem("user",JSON.stringify(result.user))
                  localStorage.setItem("token",JSON.stringify(result.auth))
                  navigate('/')
         }
         else{
            alert("please enter correct email/password")
         }
    }
    return (
        <div className='login'>
          <h1>Login</h1>
          <input 
            className='inputBox' 
            type="text" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder='Enter Email'
          />
          <input 
            className='inputBox' 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder='Enter Password'
          />
          <button 
            onClick={handlelogin} 
            className='appbutton'
            type="button"
          >
            Login
          </button>
        </div>
      );
    };

export default Login;