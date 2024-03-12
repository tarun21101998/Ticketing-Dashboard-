import React from 'react';
import Table from './table.js';
import Error from '../error';
import "../App.css"
import { useState } from 'react';
import { useEffect } from 'react';
import variable from "../env.js";

const Listing = () => {
  const token = JSON.parse(sessionStorage.getItem('token'))
  const isType = JSON.parse(sessionStorage.getItem('isType'));
  const [message, setMessage] = useState([]);
  const [arr, setArr] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(2);
  const function1 = async ()=>{
    let result = await fetch(`${variable}/users?token=${token}`, {
      method: 'get',
      // body: JSON.stringify({token}),
      headers: {
        'Content-Type': 'application/json'
    }

    });
    result = await result.json();
    // let d = await JSON.parse(result.isType)
    console.log(result)
    setMessage(result)
    setArr(result)
  }


  useEffect(() => {
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
  const sortFilterFunction= (e) => {
    console.log(e.target.value)
    if(e.target.value === "ascending"){
    let result = [...message].sort((a, b) => (a.firstName > b.firstName) ? 1 : -1);
    setArr(result)
    }
else if(e.target.value === "descending"){
  const result = [...message].sort((a, b) => (a.firstName > b.firstName) ? -1 : 1);
  setArr(result)
}
else{
  setArr(message);

}

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

  return (
    <div className="body">
  {isType === 0 || isType===2 ?
  <>
      <div className="input">
        <div className="sorting">
          <select onChange={sortFilterFunction}>
            <option value="defaule">Sort</option>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="DescendingDate">Descending (Date)</option>
          </select>
        </div>


        <input type="text" placeholder="Search by firstName/emailId" value={val} onChange={filterFunction} />
      </div>
      <Table data={newData} token={token} variable={variable} function1 = {function1}  />
      <div className="paginationButton1">

        <div className="paginationButton">
          <button onClick={prePage}>Previous</button>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
      </>
      :
      <Error />
            }
    </div>
  );
}


export default Listing;
