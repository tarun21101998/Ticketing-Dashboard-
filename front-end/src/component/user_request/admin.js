import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import "../App.css"

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
        <div className="table_div">
            <table className="table table1" style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th className="table table2">Ticket ID</th>
                        <th className="table table2">Email ID</th>
                        <th className="table table2">Name</th>
                        <th className="table table2">Number</th>
                        <th className="table table2">Contact Number</th>
                        <th className="table table2">Slot</th>
                        <th className="table table2">Start time</th>
                        <th className="table table2">End time</th>
                        <th className="table table2">Status</th>
                        <th className="table table2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {arr.map((values, index) => (
                        <tr key={index}>
                            <td className="table">#8{values._id}</td>
                            <td className="table">{values.email}</td>
                            <td className="table">{values.name}</td>
                            <td className="table">{values.number}</td>
                            <td className="table">{values.contactNumber}</td>
                            <td className="table">{values.slot}</td>
                            <td className="table">  {moment(values.from).format('MMMM Do YYYY, h:mm:ss a')}</td>
                            <td className="table">{moment(values.to).format('MMMM Do YYYY, h:mm:ss a')}</td>
                            <td className="table"> <>{values.semiStatus === 0 ? "pending" : values.semiStatus === 1 ? "accept" : values.semiStatus === 2 ? "reject" : "Re-Review"}</>
                                <span>
                                    <span><br />
                                        {values.status === 1 || values.status === 2 ?
                                            "published"
                                            : <></>
                                        }
                                    </span>

                                </span>
                            </td>
                            <td className="table">

                                <button className="buttonStyle" onClick={() => reReview(values._id)}>Re-review</button>
                                /
                                <button className="buttonStyle" onClick={(e) => publish(e, values._id)}>Publish</button>

                            </td>


                        </tr>

                    ))}
                </tbody>
            </table>

        </div>

    );
}

export default Admin;