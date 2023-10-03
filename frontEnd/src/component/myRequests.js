import React from "react";
import "./App.css"
import Login from "./login";
import { useEffect, useState } from "react";
import "./App.css"
import { Link ,   useNavigate  } from "react-router-dom";

const MyRequests= ()=>{

    const   email1 = JSON.parse(sessionStorage.getItem('user'));
    const [email, setEmail] = useState(email1)
    const [data, setData] = React.useState([]);
    const [arr, setArr] = useState([])
    const navigate = useNavigate();
const [val, setVal] = useState("")
const [currentPage, setCurrentPage]= useState(1)
const [dataPerPage, setDataPerPage]= useState(4);


    const filterFunction = (e)=>{
        // console.log(e.target.value);
        e.preventDefault()
        setVal(e.target.value)
      
        if(e.target.value){
          // console.log(result)
          let result = data.filter((item)=> item.email.toLowerCase().includes(e.target.value.toLowerCase()))
          // console.log(result)
              setArr(result)
        }
        if(e.target.value === ""){
          setArr(data)
        }
      }
      

useEffect(()=>{

    const fetchData = async()=>{    
    let result = await fetch("http://localhost:8000/sendrequests", {
            method: 'post',
            body: JSON.stringify({email}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        // console.log(result)
        const data1 =  [...result].sort((a,b)=>new Date(b.updatedAt) - new Date(a.updatedAt));
        console.log(data1)
        if(result){
            setData(data1)
            setArr(data1)
            // console.log(data)
        }
    }
    fetchData();
    }, [])

// console.log(data)
const lastDataIndex = currentPage * dataPerPage
const firstPagePerIndex = lastDataIndex - dataPerPage
const newData = arr.slice(firstPagePerIndex, lastDataIndex)

const prePage = ()=>{
    if(currentPage >1 ){
      setCurrentPage(currentPage - 1)
    }
  }
  
  const nextPage = ()=>{
    // console.log(arr.length)
    if(currentPage  <= (arr.length / dataPerPage)){
      setCurrentPage(currentPage+1)
      console.log(currentPage)
    }
    
  
  }
  
  
    return(
        <div className="body">
              <div className="input">
        

    <input type="text" placeholder= "Search by firstName/emailId" value={val} onChange={filterFunction} />
    </div>

      <div className="table_div">
  
  <table className="table table1">
  <thead>
  <tr>
    <th className="table table2">Email ID</th>
    <th className="table table2">Name</th>
    <th className="table table2">Number</th>
    {/* <th className="table table2">isActive</th> */}
    <th className="table table2">Created at</th>
    <th className="table table2">Updated At</th>
  </tr>
  
  </thead>
  <tbody>
  {newData.map((value, index)=>(
        <tr key={index}>
        <td className="table">{value.email}</td>
        <td className="table">{value.name}</td>
        <td className="table">{value.number}</td>
        <td className="table">{value.createdAt}</td>
        <td className="table">{value.updatedAt}</td>
      </tr>
  
  ))}
  </tbody>
  </table>
  </div>
  <div className="paginationButton">
    <button onClick={prePage}>Previous</button>
    <button onClick={nextPage}>Next</button>
  </div>

        </div>
    );

}
export default MyRequests;