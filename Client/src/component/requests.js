import React from "react";
import variable from "./env.js";
import jwt from "jwt-decode";import "./App.css"
import "./App.css"
import {useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateRequests= ()=>{
    let token  = JSON.parse(sessionStorage.getItem('token'));

    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState(0);
    const [fromDate, setFromDate] = React.useState(0)
    const navigate = useNavigate();
    const [toDate, setToDate] = React.useState(0)
    const [message, setMessage] = React.useState("")

    const handleFromDate = (e)=>{
        e.preventDefault()
        setFromDate(e.target.value)
    }
    const handleToDate = (e)=>{
        e.preventDefault()  
        setToDate(e.target.value)
    }

    const handleRequest= async (e) => {
        if(name && number && contactNumber && fromDate && toDate){
        e.preventDefault()
        // console.log.target.value(e)
        const date1 = new Date(fromDate)
        const date2 = new Date(toDate)
        const LatestDate = new Date()
        if(date1 > date2 || date1 < LatestDate){
            console.log("short")
            toast.error('Please enter correct Date and Time', {
                position: toast.POSITION.TOP_right
            });

            return;
        }
        else{
        await fetch(variable+"/requests", {
            method: 'post',
            body: JSON.stringify({ name, number, contactNumber, fromDate, toDate, token}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setMessage("")
        navigate('/tickets')
    }
}
toast.error('Please fill all field', {
    position: toast.POSITION.TOP_right
});

}


    return(
        <>
<div className="form">
<div className="form1">
<form>
<label>Name of your vehicle</label>
<br/><input type="text" placeholder="Enter name of your vehicle" 
onChange={(e) => setName(e.target.value)} value={name}
required />
<br/> <br/>
<label>Number of your vehicle</label>
<br/><input type="text" placeholder="Enter the Number" required 
onChange={(e) => setNumber(e.target.value)} value={number} />
<br/> <br/>
<label>Contact Number </label>
<br/><input type="number" placeholder="Enter the Contact Number" required 
onChange={(e) => setContactNumber(e.target.value)} value={contactNumber} />

<br/> <br/>
<div style={{display: "flex", justifyContent: "space-between"}}>
<label>From</label>
<label style={{marginRight: "35%"}} >To</label>
</div>
{/* <br/> */}
<div style={{display: "flex", justifyContent: "space-between"}}>
<input type="datetime-local" step="2" required onChange = {handleFromDate} style={{width: "40%"}} value={fromDate}/>
<input type="datetime-local" step="2" onChange={handleToDate} required style={{width: "40%"}} value={toDate} />
</div>
<br/>
<span>{message}</span>
<br/><button onClick={handleRequest} type="submit" style={{width: "30%" }} >Submit Ticket</button>
</form>
</div>
</div>
<ToastContainer />
        </>
    );

}
export default CreateRequests;