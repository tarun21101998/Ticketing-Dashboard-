import React from "react";
import variable from "../env.js";
import moment from"moment";
import "../App.css"
import { useParams, useNavigate  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// function for editing the ticket
const EditTicket = ()=>{
let param = useParams();
let param1 = param.id;

const token = JSON.parse(sessionStorage.getItem('token'))

// variable  for all the fields
const [name, setName] = React.useState('');
    const [number, setNumber] = React.useState('');
    const [contactNumber, setContactNumber] = React.useState(0);
    let [fromDate, setFromDate] = React.useState('2010-01-01T11:00')
    const [toDate, setToDate] = React.useState('0000-00-00T00:00')
    const [slot, setSlot]= React.useState()

    const navigate = useNavigate();
    const [message, setMessage] = React.useState("")


    // getting the  user_detail for editing
    const getUserDetails = async()=>{    
        let result = await fetch(`${variable}/getUserDetail?params=${param1}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();

            // converting the date into required format
            let startDate = moment(result.from).format("YYYY-MM-DDTHH:mm:SS")
            let endDate = moment(result.to).format("YYYY-MM-DDTHH:mm:SS")

            startDate = startDate.toString()
            endDate = endDate.toString()
if(result){
    setName(result.name);
    setNumber(result.number)
    setContactNumber(result.contactNumber);
    setFromDate(startDate)    
    setToDate(endDate);
    setSlot(result.slot)
}
        }

        // calling the API for getting the user_details
        React.useEffect(() => {
            getUserDetails();
        }, [])

        // setting the new_date
    const handleFromDate = (e)=>{
        e.preventDefault()
        setFromDate(e.target.value)
    }

    // setting the to_date
    const handleToDate = (e)=>{
        e.preventDefault()  
        setToDate(e.target.value)
    }

    // sending the  new details from front to back_end
    const handleRequest= async (e) => {
        if(name && number && contactNumber && fromDate && toDate){
        e.preventDefault()
        const date1 = new Date(Date.parse(fromDate))
        const date2 = new Date(Date.parse(toDate))
        const LatestDate = new Date()

        if(date1 > date2 || date1 < LatestDate){
            toast.error('Please enter correct Date and Time', {
                position: toast.POSITION.TOP_right
            });
            return;
        }
        else{
            // sending the tickets details from front_end to back_end
        await fetch(variable+"/editTicket", {
            method: 'put',
            body: JSON.stringify({ name, number, contactNumber, fromDate, toDate,   param, token}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setMessage("")
        navigate('/tickets')
    }
}
else{
    // error will show    if all fields are not filled 
toast.error('Please fill all field', {
    position: toast.POSITION.TOP_right
});
}

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
            <input type="text" id="carNumber" onChange={(e) => setNumber(e.target.value)} value={number}  required />
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
        <button type="submit" onClick={()=>{{
                sessionStorage.removeItem('editId')
                navigate('/tickets')
            }}}>Cancel</button>

    </form>
</div>


<ToastContainer />
        </>
    );

}
export default EditTicket;