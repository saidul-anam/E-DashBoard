import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        let auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async () => {
        console.warn(email, password);
        let result = await fetch('https://e-dashboard-k01b.onrender.com/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        result = await result.json();
        console.warn(result);
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user)); 
            localStorage.setItem("token", JSON.stringify(result.auth)); 
            navigate('/'); 
        } else {
            alert("Please enter correct email/password");
        }
    };

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
                onClick={handleLogin} 
                className='appbutton'
                type="button"
            >
                Login
            </button>
        </div>
    );
};

export default Login;
