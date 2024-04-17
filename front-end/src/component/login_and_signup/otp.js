import { useScroll } from "framer-motion";
import variable from "../env.js";
import React from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Otp = () => {
  let param = useParams();
  let param1 = param.id;

  // focus to input field
const input_ref = useRef(null);

// navigate variable
  const navigate = useNavigate();

useEffect(()=>{
  input_ref.current.focus()
})


  const [otp, setOtp] = useState()

  const handle_otp = async (e) => {
    e.preventDefault()
    if (!otp) {
      toast.error("Please fill out all field", {
        position: toast.POSITION.TOP_CENTER
      })

      return;
    }
    let result = await fetch(variable + "/otp", {
      method: 'post',
      body: JSON.stringify({ otp, param }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json()
    console.log(result)
    if (result.response === false) {
      toast.error('Please fill out the field', {
        position: toast.POSITION.TOP_CENTER
      })
    }
    else if (result.response === 401) {
      toast.error("Wrong OTP", {
        position: toast.POSITION.TOP_CENTER
      })
    }
    else if(result.response === true){
    navigate('/login')
    }
  }

  return (
    <>
      <div class="container">
        <h2>Enter OTP</h2>
        <form id="otpForm">
          <input type="text" id="otpInput" maxlength="6" ref={input_ref} pattern="\d{6}" title="Enter 6-digit OTP" onChange={(e) => setOtp(e.target.value)} required />
          <button type="submit" onClick={handle_otp}>Submit</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
export default Otp;