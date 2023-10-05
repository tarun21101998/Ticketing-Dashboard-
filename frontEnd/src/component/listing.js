import React from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import Table from 'react-bootstrap/Table'

import "./App.css"
import { useState } from 'react';
import { useEffect } from 'react';

const Listing = () => {
  const [message, setMessage] = useState([]);
  const [arr, setArr] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(10);
  useEffect(() => {
    fetch("http://localhost:8000/users").then((resp) => {
      resp.json().then((result) => {
        // console.log(result)
        setMessage(result)
        // console.log(result);
        setArr(result)
        // console.log(arr)
      })
    })
  }, [])
  //   const [arr, setArr] = useState(message)
  // console.log(message)
  const lastDataIndex = currentPage * dataPerPage
  const firstPagePerIndex = lastDataIndex - dataPerPage
  const newData = arr.slice(firstPagePerIndex, lastDataIndex)
  // console.log(arr)
  const [val, setVal] = React.useState("")
  const filterFunction = (e) => {
    // console.log(e.target.value);
    e.preventDefault()
    setVal(e.target.value)

    if (e.target.value) {
      // console.log(result)
      let result = message.filter((item) => item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase()))
      // console.log(result)
      setArr(result)
    }
    if (e.target.value === "") {
      setArr(message)
    }
  }
  const ascendingFunction = () => {
    let result = [...message].sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
    console.log(result)
    setArr(result)
  }
  const descendingFunction = () => {
    // console.log(message)
    const result = [...message].sort((a, b) => (a.firstName > b.firstName) ? -1 : 1);

    // console.log("tarun")
    console.log(result)
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
    // console.log(arr.length)
    if (currentPage <= (arr.length / dataPerPage)) {
      setCurrentPage(currentPage + 1)
      console.log(currentPage)
    }


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
              <tr key={index}>
                <td className="table">{value.firstName}</td>
                <td className="table">{value.lastName}</td>
                <td className="table">{value.email}</td>
                {value.isActive == true ? <td className="table">Yes</td> : <td className="table">No</td>}
                {value.isType== true ? <td className="table">Admin</td> : <td className="table">User</td>}
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
