import React from 'react';
import "./App.css"
import { useState } from 'react';
import { useEffect } from 'react';

const  App = ()=> {
  const [message, setMessage] = useState([]);
  const [arr, setArr] = useState([])
  useEffect(()=>{
    fetch("http://localhost:8000/users").then((resp)=>{
      resp.json().then((result)=>{
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

// console.log(arr)
const [val, setVal] = React.useState("")
const filterFunction = (e)=>{
  // console.log(e.target.value);
  e.preventDefault()
  setVal(e.target.value)

  if(e.target.value){
    // console.log(result)
    let result = message.filter((item)=> item.firstName.toLowerCase().includes(e.target.value.toLowerCase())  || item.email.toLowerCase().includes(e.target.value.toLowerCase()))
    // console.log(result)
        setArr(result)
  }
  if(e.target.value === ""){
    setArr(message)
  }
}
const ascendingFunction = ()=>{
    let result =  [...message].sort((a, b)=> a.firstName.localeCompare(b.firstName))
    setArr(result)
  }
  const descendingFunction = ()=>{
    let result =  [...message].sort((a, b)=> b.firstName.localeCompare(a.firstName))
    setArr(result)
  }
  const normalFunction = ()=>{
    setArr(message);
  }
  

return(
      <div className="body">
      <div className="input">
        <div className="sorting">
            <button onClick={ascendingFunction}>Ascending</button>
        <button onClick={descendingFunction} >Descending</button>
        <button onClick={normalFunction}>Back to noromal</button>
        </div>
        

    <input type="text" placeholder= "Search by firstName/emailId" value={val} onChange={filterFunction} />
    </div>
      <div className="table_div">
  
  <table className="table table1">
  <thead>
  <tr>
    <th className="table">First Name</th>
    <th className="table">Last Name</th>
    <th className="table">Email</th>
    <th className="table">Created at</th>
    <th className="table">Updated At</th>
  </tr>
  
  </thead>
  
  {arr.map((value,key)=>(
    <tr>
      <td className="table">{value.firstName}</td>
      <td className="table">{value.lastName}</td>
      <td className="table">{value.email}</td>
      <td className="table">{value.createdAt}</td>
      <td className="table">{value.updatedAt}</td>
    </tr>
  ))}
  
  
  </table>
  </div>
      </div>
    );
  }
  

export default App;
