import React from "react";
import {useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../CSS/login.css"
import {useNavigate  } from "react-router-dom";
import { defaultFormat } from "moment/moment";
import variable from "../env.js";
// toast.configure()


const Login = ()=>{
    console.log(variable)
    const [showHidePassword, setShowHidePassword] = useState(false)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState("")
    


    const handleLogin = async (e) => {
        e.preventDefault()
        let result = await fetch(variable+"/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
                headers: {
                'Content-Type': 'application/json'
            }
        });        
        result = await result.json();
        if(result.isActive == false){
            setErr("Wrong credentials")
            return;
        }
        if (result.auth) {
                sessionStorage.setItem('token', JSON.stringify(result.auth));
                sessionStorage.setItem('isType', JSON.stringify(result.isType))
                sessionStorage.setItem('id', JSON.stringify(result._id))
            // navigate("/")
            toast.success('Successfully! logged in', {
                position: toast.POSITION.TOP_center
            });
            // setTimeout(()=>{
                navigate('/')
            // }, 0)

        }
        else if(result.responce === false){
            toast.error('Enter correct Email Id', {
                position: toast.POSITION.TOP_center
            });

            // console.log("enter correct email")
        }
         else {
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
            <label for="username">Username:</label>
            <input type="text"  onChange={(e) => setEmail(e.target.value)} value={email}  required />

            <label for="password">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

            <button onClick={handleLogin} type="submit">Login</button>
        </form>
    </div>
    <ToastContainer />
    </div>

    );
}

export default Login;