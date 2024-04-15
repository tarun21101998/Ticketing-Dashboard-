import React from "react";
import Admin from "./admin.js";
import Reviewer from "./reviewer.js";
import User from "./user.js";
import variable from "../env.js";

import "./index.css"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EditTicket from "./edit_request_data";

const MyRequests = () => {
  const [firstName, setFirstName] = React.useState("")
  const token = JSON.parse(sessionStorage.getItem('token'));
  const [email, setEmail] = useState(token)
  const [isType, setIsType] = React.useState()
  const [data, setData] = React.useState([]);
  const [arr, setArr] = useState([])
  const navigate = useNavigate();
  const [val, setVal] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(5)


  const filterFunction = (e) => {
    e.preventDefault()
    setVal(e.target.value)

    if (e.target.value) {
      let result = data.filter((item) => item.email.toLowerCase().includes(e.target.value.toLowerCase()) || item.number.toLowerCase().includes(e.target.value.toLowerCase()))          // console.log(result)
      setArr(result)
    }
    if (e.target.value === "") {
      setArr(data)
    }
  }

  const ascending_date_sort = () => {
    const data1 = [...data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    setArr(data1)
  }

  const descending_date_sort = () => {
    const data1 = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setArr(data1)
  }

  const fetchData = async () => {
    let result = await fetch(`${variable}/sendrequests?token=${token}`, {
      method: 'get',
      // body: JSON.stringify({token}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result.firstName)
    setIsType(result.data)
    setFirstName(result.firstName + " " + result.lastName);
    result = result.user1
    const data1 = [...result].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (result) {
      setData(data1)
      setArr(data1)
    }
  }



  useEffect(() => {

    fetchData();
  }, [])

  // console.log(data)
  const lastDataIndex = currentPage * dataPerPage
  const firstPagePerIndex = lastDataIndex - dataPerPage
  const newData = arr.slice(firstPagePerIndex, lastDataIndex)

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const nextPage = () => {
    // console.log(arr.length)
    if (currentPage <= (arr.length / dataPerPage)) {
      setCurrentPage(currentPage + 1)
      // console.log(currentPage)
    }
  }
  const select_option = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    if (e.target.value === "ascending") {
      ascending_date_sort()
    }
    else if (e.target.value === "descending") {
      descending_date_sort()
    }
    else {
      fetchData()
    }
  }
  return (
    <div className="body">
      <header className="header">
        <div className="user">
          <span className="username">{firstName}</span>
        </div>
        <div className="search">
          <input type="text" placeholder="Search..." value={val} onChange={filterFunction} />
          <select onChange={select_option}>
            <option value="reset">Reset</option>

            <option value="descending">Descending</option>
            <option value="ascending">Ascending</option>
          </select>
        </div>
      </header>
      {isType === 0 ? <Admin variable={variable} ticketArrayList={newData} fetchData={fetchData} /> : isType === 2 ? <Reviewer variable={variable} ticketArrayList={newData} fetchData={fetchData} /> : <User variable={variable} ticketArrayList={newData} fetchData={fetchData} />}
      <div className="button-container">
        <button onClick={prePage} className="button">Previous</button>
        <button onClick={nextPage} className="button">Next</button>
      </div>


    </div>
  );

}
export default MyRequests;