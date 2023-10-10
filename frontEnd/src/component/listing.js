import React from 'react';

import "./App.css"
import { useState } from 'react';
import { useEffect } from 'react';

const Listing = () => {
  const [message, setMessage] = useState([]);
  const [arr, setArr] = useState([])
  const [changeActive, setChangeActive]= React.useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(10);
  useEffect(() => {
    const function1 = async ()=>{
      let result = await fetch("http://localhost:8000/users");
      result = await result.json();
      // let d = await JSON.parse(result.isType)
      console.log(result)
      setMessage(result)
      setArr(result)
    }
    function1()
  }, [])
  const lastDataIndex = currentPage * dataPerPage
  const firstPagePerIndex = lastDataIndex - dataPerPage
  const newData = arr.slice(firstPagePerIndex, lastDataIndex)
  const [val, setVal] = React.useState("")
  const filterFunction = (e) => {
    e.preventDefault()
    setVal(e.target.value)

    if (e.target.value) {
      let result = message.filter((item) => item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase()))
      setArr(result)
    }
    if (e.target.value === "") {
      setArr(message)
    }
  }
  const ascendingFunction = () => {
    let result = [...message].sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
    setArr(result)
  }
  const descendingFunction = () => {
    const result = [...message].sort((a, b) => (a.firstName > b.firstName) ? -1 : 1);

    setArr(result)
  }
  const normalFunction = () => {
    setArr(message);
  }
  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    if (currentPage <= (arr.length / dataPerPage)) {
      setCurrentPage(currentPage + 1)
    }


  }

  const active = async (e, value)=>{
    await setChangeActive(value)
    console.log(changeActive)
        let result = await fetch("http://localhost:8000/changeActive", {
            method: 'post',
            body: JSON.stringify({value}),
                headers: {
                'Content-Type': 'application/json'
            }
        });        
        result = await result.json();
await setChangeActive(result.result1)
window.location.reload(true)
  }
  return (
    <div className="body">
      <div className="input">
        <div className="sorting">
          <button onClick={ascendingFunction}>Ascending</button>
          <button onClick={descendingFunction} >Descending</button>
          <button onClick={normalFunction}>Back to noromal</button>
        </div>


        <input type="text" placeholder="Search by firstName/emailId" value={val} onChange={filterFunction} />
      </div>
      <div className="table_div">
        <table className="table table1">
          <thead>
            <tr>
              <th className="table table2">First Name</th>
              <th className="table table2">Last Name</th>
              <th className="table table2">Email ID</th>
              <th className="table table2">Active</th>

              <th className="table table2">Type</th>
              <th className="table table2">Created At</th>
              <th className="table table2">Updated At</th>
            </tr>

          </thead>


          <tbody>
            {newData.map((value, index) => (
            //  <> 
              <tr key={index}>
                <td className="table">{value.firstName}</td>
                <td className="table">{value.lastName}</td>
                <td className="table">{value.email}</td>
                {value.isActive == true ? <td    className="table"><button onClick={(e)=>active(e, value._id)} style={{border: "none", background: "none", cursor: "pointer"}} >Active</button></td> : <td className="table"><button onClick={(e)=>active(e, value._id)} style={{border: "none", cursor: "pointer", background: "none"}}>Not active</button></td>}
                {value.isType== 1 ? <td className="table">User</td> : value.isType == 0 ? <td className="table">Admin</td> : <td className="table">Reviewer</td>}
                {/* <td className="table">{value.isType==true ? "Admin" : "User"}</td> */}
                <td className="table">{value.createdAt}</td>
                <td className="table">{value.updatedAt}</td>
            
              </tr>
            ))}

          </tbody>
        </table>
        {/* } */}
      </div>
      <div className="paginationButton1">

        <div className="paginationButton">
          <button onClick={prePage}>Previous</button>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    </div>
  );
}


export default Listing;
