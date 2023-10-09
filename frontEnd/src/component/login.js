import React from "react";
import {useState } from "react";
        import "./App.css"
import {useNavigate  } from "react-router-dom";


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
        if(result.isActive == false){
            setErr("you are not an active user")
            return;
        }
        if (result.auth) {
                sessionStorage.setItem('token', JSON.stringify(result.auth));
                sessionStorage.setItem('isType', JSON.stringify(result.isType))
                sessionStorage.setItem('id', JSON.stringify(result._id))
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
<br/><br/>  
<div style={{height: "80px", width: "100%", display: "flex", justifyContent: "center"}}>
<button onClick={handleLogin} type="submit">Login</button>
</div>
</form>
</div>
</div>

        </>
    );
}
export default Login;