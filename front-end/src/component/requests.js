import React from "react";
import variable from "./env.js";
import "./App.css"
import {useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// function for creating the user ticket
const CreateRequests= ()=>{
    // getting the JWT token from session storage
    let token  = JSON.parse(sessionStorage.getItem('token'));
// variables for user  fields
    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState(0);
    const [fromDate, setFromDate] = React.useState(0)
    const navigate = useNavigate();
    const [toDate, setToDate] = React.useState(0)
    const [slot, setSlot] = React.useState(0)


    const [message, setMessage] = React.useState("")

    // setting the from date to variable
    const handleFromDate = (e)=>{
        e.preventDefault()
        setFromDate(e.target.value)
    }

    // setting to date to variable
    const handleToDate = (e)=>{
        e.preventDefault()  
        setToDate(e.target.value)
    }

    // creating the ticket  and sending the user ticket's data to backend 
    const handleRequest= async (e) => {
        if(name && number && contactNumber && fromDate && toDate){
        e.preventDefault()
        const date1 = new Date(fromDate)
        const date2 = new Date(toDate)
        const LatestDate = new Date()
        if(date1 > date2 || date1 < LatestDate){
            toast.error('Please enter correct Date and Time', {
                position: toast.POSITION.TOP_right
            });

            return;
        }
        else{
        await fetch(variable+"/requests", {
            method: 'post',
            body: JSON.stringify({ name, number, contactNumber, fromDate, toDate, token, slot}),
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
<br/> <br/>
<label>Slot</label>
<br/><input type="text" placeholder="Enter the Slot Number" required 
onChange={(e) => setSlot(e.target.value)} value={slot} />

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