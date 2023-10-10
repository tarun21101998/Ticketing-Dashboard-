import React from "react";
import { useState, useEffect} from "react";
import {useNavigate  } from "react-router-dom";


const Profile = ()=>{
    const navigate = useNavigate();

    const   token= JSON.parse(sessionStorage.getItem('token'));
const [firstName, setFirstName] = useState("")
const [err, setErr] = useState("")
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("")
const [data1, setData1] = useState(false)
const[editFirstName, setEditFirstName] = useState("")
const[editLastName, setEditLastName] = useState("")


    useEffect(()=>{

        const fetchData = async()=>{    
        let result = await fetch("http://localhost:8000/profile", {
                method: 'post',
                body: JSON.stringify({token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            console.log(result)
            setFirstName(result.firstName)
            setLastName(result.lastName)
            setEmail(result.email)
        }
        fetchData();
        }, [])
    
const editData1 = async (e)=>{
    if(editFirstName && editLastName){
    // e.preventDefault()
    setData1(false)
    // window.location.reload(true)
    // navigate("/profile")
    let result = await fetch("http://localhost:8000/editNameProfile", {
        method: 'post',
        body: JSON.stringify({token, editFirstName, editLastName}),
        headers: {
            'Content-Type': 'application/json'
        }

        // console.log(result)
    });
    result= await result.json();
    console.log(result)
setFirstName(result.firstName)
setLastName(result.lastName)
}
setErr("enter first and last name both")
}
// console.log(editFirstName)
    return (
<>
<div className="profile">
    <div className="profile2"></div>
    <div className="profile1">
        <ul>
            <li>

        {data1 == false ? <span style={{fontSize: "2rem"}}>Hey, &nbsp;{firstName} {lastName} <button  style={{background: "none", border: "none", cursor: "pointer"}} onClick={()=>setData1(!data1)}>edit</button></span> :
          <>
          <br/> <label>First name</label><br/>
          <input type="text" placeholder="enter the first name" onChange={(e)=>setEditFirstName(e.target.value)}value={editFirstName} /> <br/> <br/>
<label>Last name</label><br/>
<input type="text" placeholder="enter the last name" onChange={(e)=>setEditLastName(e.target.value)} value={editLastName} />
{err ? 
<>
<br/><span>{err}</span>
</>
:
<span></span>
}

<br/><br/><button type="submit" onClick={editData1} style={{background: "none", border: "none", cursor: "pointer"}}>Save</button> &nbsp; <button onClick={()=>setData1(false)} style={{background: "none", border: "none", cursor: "pointer"}}>Cancel</button>
          </>
          }
          </li>
          <li>
          <br/>
    <span style={{fontSize: "2rem"}}>Email: &nbsp;</span>
    <span style={{fontSize: "2rem"}}>{email}</span>
    </li>
    </ul>
    </div>
</div>

</>

    );
}
export default Profile;