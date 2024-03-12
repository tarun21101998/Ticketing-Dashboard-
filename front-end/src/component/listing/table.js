import React from "react";
import moment from"moment";

import "../App.css"

const Table = (props)=>{
  const token = props.token
    console.log(props.token)
    const [changeActive, setChangeActive]= React.useState();
    const active = async (e, value)=>{
        await setChangeActive(value)
        console.log(changeActive)
            let result = await fetch(props.variable+"/changeActive", {
                method: 'put',
                body: JSON.stringify({value, token}),
                    headers: {
                    'Content-Type': 'application/json'
                }
            });        
            result = await result.json();
    await setChangeActive(result.result1)
    // window.location.reload(true)
    props.function1()
      }
    
    return(
        <div className="table_div">
        <table className="table table1">
          <thead>
            <tr className="tableHead">
              <th className="table table2">First Name</th>
              <th className="table table2">Last Name</th>
              <th className="table table2">Email ID</th>
              <th className="table table2">Active<br/><span style={{fontSize: "1rem"}}>(click me)</span></th>

              <th className="table table2">Type</th>
              <th className="table table2">Created At</th>
              <th className="table table2">Updated At</th>
            </tr>

          </thead>


          <tbody>
            {props.data.map((value, index) => (
            //  <> 
              <tr key={index}>
                <td className="table">{value.firstName}</td>
                <td className="table">{value.lastName}</td>
                <td className="table">{value.email}</td>
                {value.isActive === true ? <td    className="table"><button onClick={(e)=>active(e, value._id)} style={{border: "none", background: "none", cursor: "pointer"}} >Active</button></td> : <td className="table"><button onClick={(e)=>active(e, value._id)} style={{border: "none", cursor: "pointer", background: "none"}}>Not active</button></td>}
                {value.isType=== 1 ? <td className="table">User</td> : value.isType == 0 ? <td className="table">Admin</td> : <td className="table">Reviewer</td>}
                {/* <td className="table">{value.isType===true ? "Admin" : "User"}</td> */}
                <td className="table">{moment(value.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td className="table">{moment(value.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            
              </tr>
            ))}

          </tbody>
        </table>
        {/* } */}
      </div>

    );
}
export default Table;