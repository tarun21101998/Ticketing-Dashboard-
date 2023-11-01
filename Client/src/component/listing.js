import React from 'react';
  import moment from"moment";
import Error from './error';

import "./App.css"
import { useState } from 'react';
import { useEffect } from 'react';

const Listing = () => {
  const token = JSON.parse(sessionStorage.getItem('token'))
  const isType = JSON.parse(sessionStorage.getItem('isType'));
  const [message, setMessage] = useState([]);
  const [arr, setArr] = useState([])
  const [changeActive, setChangeActive]= React.useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(10);
  const function1 = async ()=>{
    let result = await fetch(`https://parking-management-system-pms.onrender.com/users?token=${token}`, {
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

  const active = async (e, value)=>{
    await setChangeActive(value)
    console.log(changeActive)
        let result = await fetch("https://parking-management-system-pms.onrender.com/changeActive", {
            method: 'post',
            body: JSON.stringify({value}),
                headers: {
                'Content-Type': 'application/json'
            }
        });        
        result = await result.json();
await setChangeActive(result.result1)
// window.location.reload(true)
function1()
  }
  return (
    <div className="body">
  {isType == 0 || isType==2 ?
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
            {newData.map((value, index) => (
            //  <> 
              <tr key={index}>
                <td className="table">{value.firstName}</td>
                <td className="table">{value.lastName}</td>
                <td className="table">{value.email}</td>
                {value.isActive == true ? <td    className="table"><button onClick={(e)=>active(e, value._id)} style={{border: "none", background: "none", cursor: "pointer"}} >Active</button></td> : <td className="table"><button onClick={(e)=>active(e, value._id)} style={{border: "none", cursor: "pointer", background: "none"}}>Not active</button></td>}
                {value.isType== 1 ? <td className="table">User</td> : value.isType == 0 ? <td className="table">Admin</td> : <td className="table">Reviewer</td>}
                {/* <td className="table">{value.isType==true ? "Admin" : "User"}</td> */}
                <td className="table">{moment(value.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td className="table">{moment(value.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
            
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
      </>
      :
      <Error />
            }
    </div>
  );
}


export default Listing;
