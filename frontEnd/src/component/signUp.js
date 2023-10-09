import React from "react";
import { useEffect, useState } from "react";
import "./App.css"
import { Link ,   useNavigate  } from "react-router-dom";


const SignUp= ()=>{
    const [adminId, setAdminId ] = useState()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isType, setIsType] = useState(false);
    const [err, setErr] = useState("")
    const[err1, setErr1] = useState("");
    const navigate = useNavigate();
    


    const handleSignUp= (e) => {
        e.preventDefault()
        // const data = e.target.value.toLocaleCompare("admin")
        console.log(e.target.value)
        if(e.target.value === "admin"){
            setIsType(0);
            setAdminId(0)
        }
        else if(e.target.value === "user"){
            setIsType(1)
            setAdminId(1)
        }
        else{
            setIsType(2)
            setAdminId(2)

        }

    }
    const handleSignUpData = async (e) => {
        e.preventDefault();
        // conTypesole.log(20)
        if(email  && firstName && lastName && password){
        let result = await fetch("http://localhost:8000/users", {
            method: 'post',
            body: JSON.stringify({firstName, lastName, email, password, isType}),
                headers: {
                'Content-Type': 'application/json'
            }
        });     
        result = await result.json();
        // console.log(result.responce)
        if(result.responce === true) {    
            navigate("/login")
        }
        else if(result.responce === false){
            setErr("email id already exists")
        }
        else if(result.responce ==  10){
            setErr("please enter complete detail")
        }
    }
    else{
        setErr1("Fill the complete form")
    }
    }


    // console.log(isType)
    return(
        <>
<div className="form">
<div className="form1">
<form>
<label> First Name </label>
<br/><input type="text" placeholder="Enter your first name" 
onChange={(e) => setFirstName(e.target.value)} value={firstName}
required />
<br/><br/><label> Last Name </label>
<br/><input type="text" placeholder="Enter your last name" 
onChange={(e) => setLastName(e.target.value)} value={lastName}
required />


<br/><label>Email ID</label>
<br/> <br/><input type="text" placeholder="Enter your emailId" 
onChange={(e) => setEmail(e.target.value)} value={email}
required />
<br/> <br/><label>Password</label>
<br/><input type="password" placeholder="Enter the password" required 
onChange={(e) => setPassword(e.target.value)} value={password} />
<br/> <br/>
<label>Select your category</label><br/>
<select onChange={handleSignUp} required>
<option value="user">User</option>
    <option value="admin">Admin</option>
    <option value="review">Review</option>
</select><br/><br/>
{adminId === 0 || adminId === 2 ? 
<>
<label>Enter the admin id</label>
<input type="text" placeholder="enter the admin id" required />
</>
 : <span></span> }
<br/><span>{err}{err1}</span>

<br/>
<div style={{height: "80px", width: "100%", display: "flex", justifyContent: "center"}}>
<button  onClick={handleSignUpData} type="submit">Sign up</button>
</div>
</form>
</div>
</div>

        </>
    );
}
export default SignUp;