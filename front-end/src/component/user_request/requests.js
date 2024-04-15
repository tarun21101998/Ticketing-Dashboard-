import React from "react";
import variable from "../env.js";
import "./requests.css"
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
<div className="container">
    <h2>Parking Reservation Form</h2>
    <form>
        <div className="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" onChange={(e) => setName(e.target.value)} value={name}
  required />
        </div>
        <div className="form-group">
            <label for="carNumber">Car Number:</label>
            <input type="text" id="carNumber" onChange={(e) => setNumber(e.target.value)} value={number}   required />
        </div>
        <div className="form-group">
            <label for="contactNumber">Contact Number:</label>
            <input type="tel" id="contactNumber" onChange={(e) => setContactNumber(e.target.value)} value={contactNumber}  required />
        </div>
        <div className="form-group">
            <label for="startDate">Start Date:</label>
            <input type="datetime-local" step="2" id="startDate" onChange = {handleFromDate} style={{width: "40%"}} value={fromDate}  required />
        </div>
        <div className="form-group">
            <label for="endDate">End Date:</label>
            <input type="datetime-local" step="2" id="endDate" onChange={handleToDate}  value={toDate}  required />
        </div>
        <div class="form-group">
            <label for="slotNumber">Slot Number:</label>
            <input type="text" id="slotNumber" onChange={(e) => setSlot(e.target.value)} value={slot}  required />
        </div>
        <button type="submit" onClick={handleRequest}>Submit</button>
    </form>
</div>


<ToastContainer />
        </>
    );

}
export default CreateRequests;