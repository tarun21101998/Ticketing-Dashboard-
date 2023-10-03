import React from "react";
import Login from "./login";
import { useEffect, useState } from "react";
import "./App.css"
import { Link ,   useNavigate  } from "react-router-dom";

const CreateRequests= ()=>{
    // console.log(email)

    const  email1  = JSON.parse(sessionStorage.getItem('user'));
    console.log(email1)

    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    // console.log(JSON.stringify(email1))
    const navigate = useNavigate();


    const handleRequest= async (e) => {
        e.preventDefault()
        // console.log.target.value(e)
        let result = await fetch("http://localhost:8000/requests", {
            method: 'post',
            body: JSON.stringify({ name, number, email1}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // result = await result.json();
        // console.warn(result)
        // if (result.auth) {
            // localStorage.setItem('user', JSON.strin  gify(result.user));
            // localStorage.setItem('user', JSON.stringify(result.auth));
            // navigate("/")
        // } else {
            // console.log(result.status)
            // alert("Please enter connect details")
        // }
    }


    return(
        <>
<div className="form">
<div className="form1">
<form>
<label>Email ID</label>
<br/><input type="text" placeholder="Enter your type of your vechile" 
onChange={(e) => setName(e.target.value)} value={name}
required />
<br/> <br/><label>Password</label>
<br/><input type="text" placeholder="Enter the Number" required 
onChange={(e) => setNumber(e.target.value)} value={number} />

<br/><br/><button onClick={handleRequest} type="submit">Login</button>
</form>
</div>
</div>

        </>
    );

}
export default CreateRequests;