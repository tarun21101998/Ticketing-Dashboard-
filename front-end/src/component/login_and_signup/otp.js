import { useScroll } from "framer-motion";
import variable from "../env.js";
import React from "react"
import { useParams, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./otp.css"



const Otp = () => {
  let param = useParams();
  let param1 = param.id;

  // fetching current time from local storage
  var countdown = localStorage.getItem('countdown') || 60;

  const [count, setCount] = useState(countdown)


  // focus to input field
const input_ref = useRef(null);

// create ref
const resend_ref = useRef(null);

// navigate variable
  const navigate = useNavigate();

useEffect(()=>{
  input_ref.current.focus()
}, [])

useEffect(()=>{
  const interval = setInterval(() => {
    // Update countdown every second
    setCount(prevCountdown => {
      if (prevCountdown <= 0) {
        resend_ref.current.disabled=false
        // If countdown reaches 0, clear the interval
        clearInterval(interval);
        return 0;
      } else {
        resend_ref.current.disabled=true
        // store countdown to local storage
        localStorage.setItem('countdown', prevCountdown -   1);
        // Decrement countdown by 1 every second
        return prevCountdown - 1;
      }
    });
  }, 1000);
  return () => clearInterval(interval);
  }, [count])

const resend_function = async (e)=>{
  e.preventDefault()
      let result = await fetch(variable + "/resend_otp", {
      method: 'post',
      body: JSON.stringify({param }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json()
if(result.response === true){
  localStorage.clear();
  resend_ref.current.disabled=false;
  setCount(60)
  input_ref.current.focus();
}
}

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
  <div className="container">
    <h2>OTP Fill Up Page</h2>
    <input type="text" ref={input_ref} pattern="\d{6}" onChange={(e) => setOtp(e.target.value)} className="otp" placeholder="Enter OTP" />
    <br/>
    <button className="submit" onClick={handle_otp}>Submit OTP</button>
    <button className="resend" ref={resend_ref} onClick={resend_function}>Resend OTP</button>
    <p className="timer">Resend OTP in <span className="countdown">{count}</span> seconds</p>
  </div>
      <ToastContainer />
    </>
  );
}
export default Otp;