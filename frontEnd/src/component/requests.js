import React from "react";
import jwt from "jwt-decode";import "./App.css"
import "./App.css"

const CreateRequests= ()=>{
    let email1  = JSON.parse(sessionStorage.getItem('token'));

    const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [fromDate, setFromDate] = React.useState(0)
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
        e.preventDefault()
        // console.log.target.value(e)
        const date1 = new Date(fromDate)
        const date2 = new Date(toDate)
        if(date1 > date2){
            console.log("short")
            setMessage("Starting date should be less than ending date")
            return;
        }
        else{
        await fetch("http://localhost:8000/requests", {
            method: 'post',
            body: JSON.stringify({ name, number, fromDate, toDate, email1}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setMessage("")
    }
    }


    return(
        <>
<div className="form">
<div className="form1">
<form>
<label>Name of yoour vehicle</label>
<br/><input type="text" placeholder="Enter name of your vehicle" 
onChange={(e) => setName(e.target.value)} value={name}
required />
<br/> <br/>
<label>Number of your vehicle</label>
<br/><input type="text" placeholder="Enter the Number" required 
onChange={(e) => setNumber(e.target.value)} value={number} />
<br/> <br/>
<div style={{display: "flex", justifyContent: "space-around"}}>
<label>From</label>
<label>To</label>
</div>
{/* <br/> */}
<div style={{display: "flex", justifyContent: "space-between"}}>
<input type="datetime-local" step="2" required onChange = {handleFromDate} style={{width: "40%"}} value={fromDate}/>
<input type="datetime-local" step="2" onChange={handleToDate} required style={{width: "40%"}} value={toDate} />
</div>
<br/>
<span>{message}</span>
<br/><button onClick={handleRequest} type="submit">Submit Ticket</button>
</form>
</div>
</div>

        </>
    );

}
export default CreateRequests;