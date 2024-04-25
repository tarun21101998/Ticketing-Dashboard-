import React, { useEffect } from "react";
import {useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../CSS/login.css"
import {useNavigate  } from "react-router-dom";
import { defaultFormat } from "moment/moment";
import variable from "../env.js";
// toast.configure()


const Login = ()=>{
    const [showHidePassword, setShowHidePassword] = useState(false)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState("")
    
// focus on input field
const email_ref = useRef(null)

useEffect(()=>{
    email_ref.current.focus()
}, [])

const handleLogin = async (e) => {
        e.preventDefault()
        if(!email && !password){
        toast.error("Enter all credentials", {
                position: toast.POSITION.TOP_CENTER
            })
            email_ref.current.focus()
            return;
        }
        let result = await fetch(variable+"/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
                headers: {
                'Content-Type': 'application/json'
            }
        });        
        result = await result.json();
        if(result.isActive == false){
            email_ref.current.focus()
            toast.error("Check your credentials", {
                position: toast.POSITION.TOP_CENTER
            })
            return;
        }
        if (result.auth) {
                sessionStorage.setItem('token', JSON.stringify(result.auth));
                sessionStorage.setItem('isType', JSON.stringify(result.isType))
                sessionStorage.setItem('id', JSON.stringify(result._id))
            toast.success('Successfully! logged in', {
                position: toast.POSITION.TOP_center
            });
                navigate('/')
        }
        else if(result.responce === false){
            toast.error('Enter correct Email Id', {
                position: toast.POSITION.TOP_center
            });
            email_ref.current.focus()

        }
         else {
            email_ref.current.focus()
            toast.error('Enter EmailId or Password', {
                position: toast.POSITION.TOP_center
            });
    }
    }


    return(
        <div className="body">
    <div className="login-container">
        <h2>Login</h2>
        <form action="#" method="post">
            <label for="username">Email:</label>
            <input type="text"  onChange={(e) => setEmail(e.target.value)} value={email} ref={email_ref} placeholder="Enter your email" required />

            <label for="password">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter your password" required />

            <button onClick={handleLogin} type="submit">Login</button>
        </form>
    </div>
    <ToastContainer />
    </div>

    );
}

export default Login;