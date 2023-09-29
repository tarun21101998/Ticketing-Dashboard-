import React from "react";
import { useEffect, useState } from "react";
import "./App.css"
import { Link ,   useNavigate  } from "react-router-dom";


const Login = ()=>{
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();
    const [err, setErr] = useState("")
    


    const handleLogin = async (e) => {
        e.preventDefault()
        let result = await fetch("http://localhost:8000/login", {
            method: 'post',
            body: JSON.stringify({ email, password }),
                headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result)
        if (result.auth) {
            sessionStorage.setItem('user', JSON.stringify(result.email));
            sessionStorage.setItem('firstName', JSON.stringify(result.firstName));
            sessionStorage.setItem('lastName', JSON.stringify(result.lastName));
            sessionStorage.setItem('isActive', JSON.stringify(result.isActive));
                sessionStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/")
        }
        else if(result.responce === false){
            setErr("Enter correct emailId")
            // console.log("enter correct email")
        }
         else {
            alert("Please enter connect details")
        }
    }


    return(
        <>
<div className="form">
<div className="form1">
<form>
<label>Email ID</label>
<br/><input type="text" placeholder="Enter your emailId" 
onChange={(e) => setEmail(e.target.value)} value={email}
required />
<br/> <br/><label>Password</label>
<br/><input type="password" placeholder="Enter the password" required 
onChange={(e) => setPassword(e.target.value)} value={password} />

<br/>{err}
<br/><br/><button onClick={handleLogin} type="submit">Login</button>
</form>
</div>
</div>

        </>
    );
}
export default Login;