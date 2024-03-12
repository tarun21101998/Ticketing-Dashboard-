import React from "react";
import variable from "../env.js";
import { Link ,   useNavigate  } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from"moment";

import "../App.css"
import { useEffect, useState } from "react";

const User = (props)=>{
    const   token  = JSON.parse(sessionStorage.getItem('token'));
    const arr = props.ticketArrayList;
    const [userContactNumber, setUserContactNumber] = React.useState()
    const [userCarName, setUserCarName] = React.useState("")
    const [userSlot, setUserSlot] = React.useState()
    const [userCarNumber, setUserCarNumber] = React.useState("")
    const [userFrom, setUserFrom] = React.useState("")
    const [userTo, setUserTo] = React.useState("")
    const [editData, setEditData] = useState(false)
    const [firstName, setFirstName] = React.useState("")
    const [userComment, setUserComment] = useState("")
    const [valueComment, setValueComment]= useState("")
    const [hideCommentDiv, setHideCommentDiv] = useState(false)
  
    const deleteTicket =  async(value)=>{
        await fetch(variable+"/deleteTicket", {
          method: 'delete',
          body: JSON.stringify({value, token}),
          headers: {
              'Content-Type': 'application/json'
          }
        });
        props.fetchData()
      }
    

    return(
        <>
        <div className="table_user">
        <table className="table table1" style={{tableLayout: "fixed"}}>
<thead>
<tr>
<th className="table table2">Email ID</th>
<th className="table table2">Name</th>
<th className="table table2">Number</th>
<th className="table table2">Contact Number</th>
{/* <th className="table table2">Start time</th> */}
{/* <th className="table table2">End time</th> */}
<th className="table table2">Status</th>
<th className="table table2">Ticket ID</th>
<th className="table table2">Edit/Delete</th>

</tr>



</thead>
<tbody>
{arr.map((value, index)=>(
            <tr key={index}>
              {/* {editData == false ?  <></> : <EditTicket props="home" />} */}
<td className="table">{value.email}</td>
<td className="table">{value.name}</td>
<td className="table">{value.number}</td>
<td className="table">{value.contactNumber}</td>
{/* <td className="table">  {moment(value.from).format('MMMM Do YYYY, h:mm:ss a')}</td> */}
{/* <td className="table">{moment(value.to).format('MMMM Do YYYY, h:mm:ss a') }</td> */}
<td className="table"> {value.status == 0?"pending" : value.status==1 ? "accept" : value.status==2 ? "reject" : "Pending"}
 </td>
 <td className="table">
 <button onClick={()=>{
  setUserComment(value.Comment)
  setUserCarName(value.name)
  setUserCarNumber(value.number)
  setUserContactNumber(value.contactNumber)
  setUserFrom(value.from)
  setUserTo(value.to)
  setUserSlot(value.slot)
  setHideCommentDiv(!hideCommentDiv)
 }} style={{cursor: "pointer", border: "none", background: "none"}}  >#8{value._id}</button>
 </td>
 { value.status ==0 ? <td className="table"><Link to={"/editTicket/"+value._id}>Edit</Link> / <button onClick={()=> deleteTicket(value._id)}  style={{background: "none", border: "none", cursor: "pointer"}}>Delete</button> </td>
 :
  <></>
  }
 {/* </tbody> */}

 {
hideCommentDiv===false ?
<></>
:
<div className="popup1 popup2">
<h1 style={{textAlign: "center"}}>Ticket Details</h1>
<ul>
{/* <ul> */}
<li>Vehicle: &nbsp;{userCarName}</li>
<li>Vehicle Number: &nbsp;{userCarNumber}</li>
<li>Contact Number: &nbsp;{userContactNumber}</li>
<li>Slot: &nbsp;{userSlot}</li>
<li>Start Time: &nbsp; {moment(userFrom).format('MMMM Do YYYY, h:mm:ss a')}</li>
<li>End Time: &nbsp; {moment(userTo).format('MMMM Do YYYY, h:mm:ss a')}</li>
<li>Comment: &nbsp;{userComment}</li>
{/* </ul> */}

</ul>
<button onClick={()=> setHideCommentDiv(false)} style={{background: "none", marginLeft: "70%", cursor: "pointer",  border: "none", fontSize: "2rem"}}>Ok</button>
</div>
}


</tr>
))}
</tbody>
</table>
</div>
<ToastContainer />
</>
    );
}

export default User;