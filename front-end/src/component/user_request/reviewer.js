import React from "react";
import "../App.css"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";


const Reviewer = (props) => {
    const [commentInput, setCommentInput] = useState("")
    const [hide, setHide] = useState(false)

    const [valueComment, setValueComment] = useState("")
    const [hideCommentDiv, setHideCommentDiv] = useState(false)

    const token = JSON.parse(sessionStorage.getItem('token'));
    const arr = props.ticketArrayList
    const acceptFunction = async (e, value) => {
        // <EditData />
        // console.log(value)
        await fetch(props.variable + "/acceptRequest", {
            method: 'put',
            body: JSON.stringify({ value, token }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.reload(true)

    }
    const rejectFunction = async (e, value) => {
        e.preventDefault()
        // setHide(false)
        console.log(value);
        if (commentInput) {
            setHide(false)
            await fetch(props.variable + "/rejectRequest", {
                method: 'put',
                body: JSON.stringify({ value, comment: commentInput, token }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            window.location.reload(true)
        }
        else {
            toast.error('please add a comment', {
                position: toast.POSITION.TOP_center
            });

        }
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
                        <th className="table table2">Accept/<br />Reject<br /> <span style={{ fontSize: "1rem" }}>(click)</span></th>
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
                            </td>
                            <td className="table">
                                <button onClick={(e) => acceptFunction(e, values._id)} style={{ border: "none", background: "none", cursor: "pointer", }}>Accept</button>/
                                <button onClick={() => setHide(!hide)} style={{ cursor: "pointer", border: "none", background: "none" }}>Reject </button><br /><button style={{ background: "none", border: "none", fontSize: "15px", cursor: "pointer" }}
                                    onClick={(e) => {
                                        console.log(values.Comment)
                                        setValueComment(values.semiComment)
                                        setHideCommentDiv(!hideCommentDiv)
                                    }}>Comment <span style={{ fontSize: "5px" }}>(click here)</span></button></td>

                            {hide == false ?
                                <></> :
                                <div className="popup1">
                                    <h1>Add a comment:</h1><br />
                                    <div className="commentFirstDiv">
                                        <textarea rows="4" cols="50" onChange={(e) => setCommentInput(e.target.value)} />
                                        <div className="commentDiv">
                                            <button type="submit" onClick={(e) => rejectFunction(e, values._id)}>Save</button><br />
                                            <button onClick={() => setHide(!hide)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>

                            }
                            {
                                hideCommentDiv === false ?
                                    <></>
                                    :
                                    <div className="popup1">
                                        <h1>Comment</h1>
                                        <p>{valueComment}</p>
                                        <button onClick={() => setHideCommentDiv(false)} style={{ background: "none", marginLeft: "70%", cursor: "pointer", border: "none", fontSize: "2rem" }}>Ok</button>
                                    </div>
                            }


                        </tr>

                    ))}
                </tbody>
            </table>

        </div>

    );
}
export default Reviewer;