import React from "react";
import variable from "./env.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from"moment";

import "./App.css"
import Login from "./login";
import { useEffect, useState } from "react";
import "./App.css"
import { Link ,   useNavigate  } from "react-router-dom";
import EditTicket from "./editTicket";

const MyRequests= ()=>{
  const [editData, setEditData] = useState(false)
  const [userComment, setUserComment] = useState("")
  const [valueComment, setValueComment]= useState("")
  const [hideCommentDiv, setHideCommentDiv] = useState(false)
  const [commentInput, setCommentInput] = useState("")
const [hide, setHide]= useState(false)
    const   token  = JSON.parse(sessionStorage.getItem('token'));
    const [email, setEmail] = useState(token)
    const [isType, setIsType]= React.useState()
    const [data, setData] = React.useState([]);
    const [arr, setArr] = useState([])
    const navigate = useNavigate();
const [val, setVal] = useState("")
const [currentPage, setCurrentPage]= useState(1)
const [dataPerPage, setDataPerPage]= useState(10)


    const filterFunction = (e)=>{
        // console.log(e.target.value);
        e.preventDefault()
        setVal(e.target.value)
      
        if(e.target.value){
          // console.log(result)
          let result = data.filter((item) => item.email.toLowerCase().includes(e.target.value.toLowerCase()) || item.number.toLowerCase().includes(e.target.value.toLowerCase()))          // console.log(result)
              setArr(result)
        }
        if(e.target.value === ""){
          setArr(data)
        }
      }

      const ascendingDateSort = ()=>{
        const data1 =  [...data].sort((a,b)=>new Date(a.createdAt) - new Date(b.createdAt));
        setArr(data1)
      }
      // ascendingDateSort()
      const fetchData = async()=>{    
        let result = await fetch(variable+"/sendrequests", {
                method: 'post',
                body: JSON.stringify({token}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            // console.log(result.data)
            setIsType(result.data)
            result= result.user1
            const data1 =  [...result].sort((a,b)=>new Date(b.createdAt) - new Date(a.createdAt));
            // console.log(data1)
            if(result){
                setData(data1)
                setArr(data1)
                // console.log(data)
            }
        }
    


useEffect(()=>{

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
      // console.log(currentPage)
    }
    
  
  }
  const acceptFunction = async (e, value)=>{
    // <EditData />
// console.log(value)
await fetch(variable+"/acceptRequest", {
  method: 'post',
  body: JSON.stringify({value}),
  headers: {
      'Content-Type': 'application/json'
  }
});
window.location.reload(true )

  }
  const rejectFunction = async  (e, value)=>{
    e.preventDefault()
    // setHide(false)
    console.log(value);
    if(commentInput){
      setHide(false)
    await fetch(variable+"/rejectRequest", {
  method: 'post',
  body: JSON.stringify({value, comment: commentInput}),
  headers: {
      'Content-Type': 'application/json'
  }
});

window.location.reload(true)
    }
    else{
      toast.error('please add a comment', {
        position: toast.POSITION.TOP_center
    });

    }
  } 
  const deleteTicket =  async(value)=>{
    await fetch(variable+"/deleteTicket", {
      method: 'delete',
      body: JSON.stringify({value}),
      headers: {
          'Content-Type': 'application/json'
      }
    });
    fetchData()
  }

  const publish = async (e, value)=>{
// e.preventDefault()
    await fetch(variable+"/publishTicket", {
      method: 'post',
      body: JSON.stringify({value}),
      headers: {
          'Content-Type': 'application/json'
      }
    });
fetchData()
  }
  const reReview = async (value)=>{
// e.preventDefault()
console.log(value)
// setTimeout(()=>{
// window.location.reload(true)
// fetchData()
// }, 0)
    await fetch(variable+"/reviewAgainTicket", {
      method: 'post',
      body: JSON.stringify({value}),
      headers: {
          'Content-Type': 'application/json'
      }
    });

fetchData()
  }


    return(
        <div className="body">
              <div className="input">
    <button style={{backgroundColor: "brown", height: "10%", marginRight: "20px", border: "none", cursor: "pointer"}} onClick={ascendingDateSort }>Descending</button>    

    <input type="text" placeholder= "Search by Number/EmailId" value={val} onChange={filterFunction} />
    </div>
    {
      isType=== 0 || isType==2?
      <div className="table_div">
          <table className="table table1" style={{tableLayout: "fixed"}}>
  <thead>
  <tr>
    <th className="table table2">Email ID</th>
    <th className="table table2">Name</th>
    <th className="table table2">Number</th>
    <th className="table table2">Contact Number</th>
    {/* <th className="table table2">isActive</th> */}
    <th className="table table2">Start time</th>
    <th className="table table2">End time</th>
    <th className="table table2">Status</th>
    { isType == 2 ? <th className="table table2">Accept/Reject<br/> <span style={{fontSize: "1rem"}}>(click)</span></th> : <></>}
  {isType==0 ? <th className="table table2">Action</th> : <></>}</tr>
  
  </thead>
  <tbody>
  {newData.map((values, index)=>(
        <tr key={index}>
        <td className="table">{values.email}</td>
        <td className="table">{values.name}</td>
        <td className="table">{values.number}</td>
        <td className="table">{values.contactNumber}</td>
        <td className="table">  {moment(values.from).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td className="table">{moment(values.to).format('MMMM Do YYYY, h:mm:ss a') }</td>
        <td className="table"> <>{values.semiStatus == 0?"pending" : values.semiStatus==1 ? "accept" : values.semiStatus== 2 ? "reject" : "Re-Review"}</>
          <span>
{isType==0 ? 
<span><br/>
  {values.status == 1 || values.status==2 ?
"published"
: <></>
}
</span>
  
 : <></>}
        </span>
          </td>
        {isType == 2 ? <td className="table"><button onClick={(e)=>acceptFunction(e, values._id)} style={{border: "none", background: "none", cursor: "pointer",}}>Accept</button>/ <button onClick={()=>setHide(!hide)} style={{cursor: "pointer", border: "none", background: "none"}}>Reject </button><br/><button style={{background: "none", border: "none", fontSize: "15px", cursor: "pointer"}}
        onClick={(e)=>{
          console.log(values.Comment)
          setValueComment(values.semiComment)
          setHideCommentDiv(!hideCommentDiv)
        }}>Comment <span style={{fontSize: "5px"}}>(click here)</span></button></td> : <></>}
        
        {hide==false ? 
<></>:  
        <div className="popup1">
        <h1>Add a comment:</h1><br/>
        <div className="commentFirstDiv">
        <textarea   rows="4"  cols="50" onChange={(e)=>setCommentInput(e.target.value)} />
        <div className="commentDiv">
            <button type="submit"  onClick={(e)=>rejectFunction(e, values._id)}>Save</button><br/>
          <button onClick={()=>setHide(!hide)}>Cancel</button>
        </div>
        </div>
      </div>

}
{/* popUp of comment  */}
{
  hideCommentDiv===false ?
  <></>
  :
  <div className="popup1">
    <h1>Comment</h1>
    <p>{valueComment}</p>
    <button onClick={()=> setHideCommentDiv(false)} style={{background: "none", marginLeft: "70%", cursor: "pointer",  border: "none", fontSize: "2rem"}}>Ok</button>
</div>
}
<td className="table">
{isType==0 ? 
<>
<button className="buttonStyle" onClick={()=>reReview(values._id)}>Re-review</button>
/
<button className="buttonStyle" onClick={(e)=>publish(e, values._id)}>Publish</button>
</>
:
<></>
}

</td>
      </tr>
  
  ))}
  </tbody>
  </table>

        </div>
        :
    <div className="table_user">
                <table className="table table1" style={{tableLayout: "fixed"}}>
  <thead>
  <tr>
    <th className="table table2">Email ID</th>
    <th className="table table2">Name</th>
    <th className="table table2">Number</th>
    <th className="table table2">Contact Number</th>
    <th className="table table2">Start time</th>
    <th className="table table2">End time</th>
    <th className="table table2">Status</th>
    <th className="table table2">Edit/Delete</th>

  </tr>


  
  </thead>
<tbody>
        {newData.map((value, index)=>(
                    <tr key={index}>
                      {/* {editData == false ?  <></> : <EditTicket props="home" />} */}
        <td className="table">{value.email}</td>
        <td className="table">{value.name}</td>
        <td className="table">{value.number}</td>
        <td className="table">{value.contactNumber}</td>
        <td className="table">  {moment(value.from).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td className="table">{moment(value.to).format('MMMM Do YYYY, h:mm:ss a') }</td>
        <td className="table"> {value.status == 0?"pending" : value.status==1 ? "accept" : value.status==2 ? "reject" : "Pending"}
         <br/><button onClick={()=>{
          setUserComment(value.Comment)
          setHideCommentDiv(!hideCommentDiv)
         }} style={{cursor: "pointer", border: "none", background: "none"}}  >See comment</button>
         </td>
         { value.status ==0 ? <td className="table"><Link to={"/editTicket/"+value._id}>Edit</Link> / <button onClick={()=> deleteTicket(value._id)}  style={{background: "none", border: "none", cursor: "pointer"}}>Delete</button> </td>
         :
          <></>
          }
         {/* </tbody> */}

         {
  hideCommentDiv===false ?
  <></>
  :
  <div className="popup1">
    <h1>Comment</h1>
    <p>{userComment}</p>
    <button onClick={()=> setHideCommentDiv(false)} style={{background: "none", marginLeft: "70%", cursor: "pointer",  border: "none", fontSize: "2rem"}}>Ok</button>
</div>
}


      </tr>
        ))}
        </tbody>
      </table>
    </div>
}
  <div className="paginationButton1">
  <div className="paginationButton">
    <button onClick={prePage}>Previous</button>
    <button onClick={nextPage}>Next</button>
  </div>
  </div>
  <ToastContainer />

        </div>
    );

}
export default MyRequests;