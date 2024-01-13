import React from "react";
import variable from "./env.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {useState } from "react";
import "./CSS/signup.css"
import {useNavigate  } from "react-router-dom";

// function for signing up
const SignUp= ()=>{


    // declaring the variable for  signing fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isType, setIsType] = useState(false);


    // variable for navigation
    const navigate = useNavigate();

    // function to provide the numeric value to  user
    const handleSignUp= (e) => {
        e.preventDefault()
        if(e.target.value === "admin"){
            setIsType(0);
        }
        else if(e.target.value === "user"){
            setIsType(1)
        }
        else{
            setIsType(2)
        }
    }

    // function for signning up sending the user sign up details to back-end
    const handleSignUpData = async (e) => {
        e.preventDefault();
        if(email  && firstName && lastName && password){
        let result = await fetch(variable+"/users", {
            method: 'post',
            body: JSON.stringify({firstName, lastName, email, password, isType}),
                headers: {
                'Content-Type': 'application/json'
            }
        });     
        result = await result.json();
        if(result.responce === true) {    
            navigate("/login")
        }
        else if(result.responce === false){
            toast.error('Email id already exists', {
                position: toast.POSITION.TOP_center
            });
        }
        else if(result.responce ===  10){
            toast.error('Enter complete Details', {
                position: toast.POSITION.TOP_center
            });
        }
    }
    else{
        toast.error('Enter complete details', {
            position: toast.POSITION.TOP_center
        });
}
    }


    return(
        <div className="signup-body">
        <div className="signup-container">
        <h2>Sign Up</h2>
        <form action="#" method="post">
            <label for="firstName">First Name:</label>
            <input type="text"  onChange={(e) => setFirstName(e.target.value)} value={firstName} required />

            <label for="lastName">Last Name:</label>
            <input type="text"  onChange={(e) => setLastName(e.target.value)} value={lastName} required />

            <label for="email">Email:</label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email}  required />

            <label for="password">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}   required />

            <label for="type">Select Role:</label>
            <select onChange={handleSignUp} required>
<option value="user">User</option>
    <option value="admin">Admin</option>
    <option value="review">Reviewer</option>
</select>
            <button onClick={handleSignUpData} type="submit">Sign Up</button>
        </form>
    </div>
    <ToastContainer />

</div>
    );
}
export default SignUp;