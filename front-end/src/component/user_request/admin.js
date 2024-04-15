import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import "./admin.css"

const Admin = (props) => {
    const arr = props.ticketArrayList

    const reReview = async (value) => {
        await fetch(props.variable + "/reviewAgainTicket", {
            method: 'put',
            body: JSON.stringify({ value }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        props.fetchData()
    }
    const publish = async (e, value) => {
        // e.preventDefault()
        await fetch(props.variable + "/publishTicket", {
            method: 'put',
            body: JSON.stringify({ value }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        props.fetchData()
    }



    return (
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>Ticket Id</th>
                    <th>Email Id</th>
                    <th>Name</th>
                    <th>Vehicle Number</th>
                    <th>Ph. Number</th>
                    <th>Slot</th>
                    <th>Start time</th>
                    <th>End time</th>
<th>Status</th>
<th>Action</th>
                </tr>
            </thead>
            <tbody>
            {arr.map((values, index) => (
            <tr key={index}>
                <td>#8{values._id}</td>
                <td>{values.email}</td>
                <td>{values.name}</td>
                <td>{values.number}</td>
                <td>{values.contactNumber}</td>
                <td>{values.slot}</td>
                <td>  {moment(values.from).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{moment(values.to).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td> <>{values.semiStatus === 0 ? "pending" : values.semiStatus === 1 ? "accept" : values.semiStatus === 2 ? "reject" : "Re-Review"}</>
                    <span>
                        <span><br />
                            {values.status === 1 || values.status === 2 ?
                                "published"
                                : <></>
                            }
                        </span>

                    </span>
                </td>
                <td>

                    <button className="buttonStyle" onClick={() => reReview(values._id)}>Re-review</button>
                    /
                    <button className="buttonStyle" onClick={(e) => publish(e, values._id)}>Publish</button>

                </td>


            </tr>

        ))}


            </tbody>
        </table>
    </div>

        // </>
    );
}

export default Admin;