import React, { useEffect } from "react";
import variable from "../env.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useRef } from "react";
import "../CSS/signup.css"
import {useNavigate  } from "react-router-dom";

// function for signing up
const SignUp= ()=>{


    // declaring the variable for  signing fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isType, setIsType] = useState();


    // variable for navigation
    const navigate = useNavigate();
// focus on input field
    const input_ref = useRef(null);
    const password_ref = useRef(null)
const sign_up_ref = useRef(null);

useEffect(()=>{
    sign_up_ref.current.focus()
}, [])

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
            if(!email.endsWith('@gmail.com')){
                toast.error('Please enter proper email id', {
                    position: toast.POSITION.TOP_CENTER
                })
                input_ref.current.focus();
                return;
            }
            if(password.length < 8){
                // console.log("enter here")
                toast.error('Password should be atleast 8 characters', {
                    position: toast.POSITION.TOP_CENTER
                })
                password_ref.current.focus()
                return;
            }
        let result = await fetch(variable+"/users", {
            method: 'post',
            body: JSON.stringify({firstName, lastName, email, password, isType}),
                headers: {
                'Content-Type': 'application/json'
            }
        });     
        result = await result.json();
        console.log(result)
        if(result.response === true) {    
            setEmail(result.email)
            navigate('/otp/'+email);
        }
        else if(result.response === "already_exists"){
            toast.error('Email id already exists', {
                position: toast.POSITION.TOP_center
            });
        }
    }
    else{
        toast.error('Please fill out the complete form', {
            position: toast.POSITION.TOP_center
        });
        sign_up_ref.current.focus();
}
    }


    return(
        <div className="signup-body">
        <div className="signup-container">
        <h2>Sign Up</h2>
        <form action="#" method="post">
            <label for="firstName">First Name:</label>
            <input type="text" ref={sign_up_ref}  onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="Enter your first name" required />

            <label for="lastName">Last Name:</label>
            <input type="text"  onChange={(e) => setLastName(e.target.value)} value={lastName} placeholder="Enter your last name" required />

            <label for="email">Email:</label>
            <input type="email" ref={input_ref} onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email id" required />

            <label for="password">Password:</label>
            <input type="password" ref={password_ref} onChange={(e) => setPassword(e.target.value)} value={password}   placeholder="Enter your password" required />

            <label for="type">Select Role:</label>
            <select onChange={handleSignUp} required>
                <option>Select</option>
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