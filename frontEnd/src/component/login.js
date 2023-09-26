import React from "react";
import "./App.css"
import { Link } from "react-router-dom";


const Login = ()=>{
    return(
        <>
<div className="form">
<div className="form1">
<form>
<label>Email ID</label>
<br/><input type="text" placeholder="Enter your emailId" required />
<br/> <br/><label>Password</label>
<br/><input type="password" placeholder="Enter the password" required />

<br/><br/><button type="submit">Login</button>
</form>
</div>
</div>

        </>
    );
}
export default Login;