import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import {useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
        import "./App.css"
import {useNavigate  } from "react-router-dom";
// toast.configure()


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
            setTimeout(()=>{
                navigate('/')
            }, 1000)

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
        <>
<div className="form">
<div className="form1">
<h1 className="formHeading">Login</h1>
<br/><br/>

<form>
<label>Email ID</label>
<br/><input type="text" placeholder="Enter your emailId" 
onChange={(e) => setEmail(e.target.value)} value={email}
required />
<br/> <br/><label>Password</label>
<br/><input type="password" placeholder="Enter the password" required 
onChange={(e) => setPassword(e.target.value)} value={password} />

<br/><span className="errLine" style={{marginLeft: "10px"}}>{err}</span>
<br/><br/>  
<div style={{height: "80px", width: "100%", display: "flex", justifyContent: "center"}}>
<button onClick={handleLogin} type="submit">Login</button>
</div>
</form>
</div>
</div>
<ToastContainer />
        </>
    );
}
export default Login;