import React from "react";
import {toast } from 'react-toastify';
import { useState, useEffect} from "react";
import variable from "../env.js";
import {useNavigate  } from "react-router-dom";


const Profile = ()=>{
    const[data2, setData2] = useState(false)
    const[err1, setErr1] = useState("")
    const [editNewEmail, setEditNewEmail] = useState("")
    const navigate = useNavigate();

    const   token= JSON.parse(sessionStorage.getItem('token'));
console.log(token)
    const [firstName, setFirstName] = useState("")
const [err, setErr] = useState("")
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("")
const [data1, setData1] = useState(false)
const[editFirstName, setEditFirstName] = useState("")
const[editLastName, setEditLastName] = useState("")


    useEffect(()=>{

        const fetchData = async()=>{    
        let result = await fetch(`${variable}/profile?token=${token}`, {
                method: 'get',
                // body: JSON.stringify({token}),
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
        })
    
const editData1 = async (e)=>{
    if(editFirstName && editLastName){
    // e.preventDefault()
    setData1(false)
    // window.location.reload(true)
    // navigate("/profile")
    let result = await fetch(variable+"/editNameProfile", {
        method: 'put',
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
toast.success('Successfully! Changed your name', {
    position: toast.POSITION.TOP_center
});

}
setErr("enter first and last name both")
}
const handleChange = async (e)=>{
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    // console.log(e.target.files)
    await fetch(variable+"/upload", {
        method: "POST",
        body: formData,
      });

 
}

// console.log(editFirstName)
const updateEmail = async (e)=>{
    if(editNewEmail){
    e.preventDefault()
    setData2(false)
    // window.location.reload(true)
    // navigate("/profile")
    let result = await fetch(variable+"/editEmailProfile", {
        method: 'put',
        body: JSON.stringify({token, editNewEmail}),
        headers: {
            'Content-Type': 'application/json'
        }

        // console.log(result)
    });
    result= await result.json();
if(result.responce === false){
    setErr1("email id already exist")
    return;
}
toast.success('Congrats! Email ID successfully changed ', {
    position: toast.POSITION.TOP_center
});

sessionStorage.removeItem('token');
sessionStorage.removeItem('isType')
sessionStorage.removeItem('isActive')
setTimeout(()=>{
    navigate('/')
}, 1000)

}
setErr("enter email")
}



    return (
<>
<div className="profile">
    <div className="profile2">
    {/* <img src="./1.JPG" /> */}
    <input type="file" onChange={handleChange} className="image"/>

    </div>
    <div className="profile1">
        <ul>
            <li>

        {data1 === false ? <span style={{fontSize: "2rem"}}>Hey, &nbsp;{firstName} {lastName} <button  style={{background: "none", border: "none", cursor: "pointer"}} onClick={()=>setData1(!data1)}>edit</button></span> :
          <>
          <br/> <label>First name</label><br/>
          <input type="text" placeholder="enter the first name" onChange={(e)=>setEditFirstName(e.target.value)}value={editFirstName} /> <br/> <br/>
<label>Last name</label><br/>
<input type="text" placeholder="enter the last name" onChange={(e)=>setEditLastName(e.target.value)} value={editLastName} />
{err ? 
<>
<br/><span className="errLine">{err}</span>
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
    {data2===false ?
    <>
    <span style={{fontSize: "2rem"}}>Email: &nbsp;</span>
    <span style={{fontSize: "2rem"}}>{email} <button  style={{background: "none", border: "none", cursor: "pointer"}} onClick={()=>setData2(!data2)}>edit</button></span>
    <br/> <span className="errLine">{err1}</span>
    </>
    :
    <>
    <label>Enter new email id</label><br/>
    <input type="text" placeholder="enter your new email id" onChange={(e)=> setEditNewEmail(e.target.value)} value={editNewEmail} />
    <br/><span>{err}</span>
    <br/><br/><button style={{background: "none", border: "none", marginLeft: "60px", cursor: "pointer"}} onClick = {updateEmail}>Save</button>&nbsp; <button onClick={()=>setData2(false)} style={{background: "none", border: "none", cursor: "pointer"}}>Cancel</button>
     </>
     }
    </li>
    </ul>
    </div>
</div>

</>

    );
}
export default Profile;