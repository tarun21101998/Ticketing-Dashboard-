import { Link, useNavigate, Outlet } from "react-router-dom";
import { FaBeer } from 'react-icons/fa';
import { motion } from "framer-motion"
import jwt from "jwt-decode";import "./App.css"
import React from "react";
const Navbar = () => {
    const [hide, setHide]= React.useState(false)
    const auth1 = sessionStorage.getItem('isType');
    let auth = JSON.parse(auth1)
    const navigate = useNavigate();
    // console.log(auth)
    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isType')
        sessionStorage.removeItem('isActive')
        setHide(!hide);
        navigate('/signup')
    }
        return (
        <>
        {
            hide == false ?
            <div>
            <button onClick={()=>setHide(!hide)}><FaBeer  /> Menu
</button>

            </div>
            :
            <motion.aside 
            initial={{ width: 0 }} 
            animate={{ width: 300 }}>
<div className="navbar">
    {
    auth == 0 || auth==2 ?
    <>
    <button onClick={()=>setHide(!hide)}><FaBeer  /> Menu</button>
    <ul>
        <li>                            <Link onClick={()=>setHide(!hide)} to="/profile">My profile</Link>
</li>

    <li>                            <Link  onClick={()=>setHide(!hide)} to="/">Home</Link>
</li>
<li>                            <Link onClick={()=>setHide(!hide)} to="/users"><h3>Dashboard</h3></Link>

</li>
<li>                            <Link onClick={()=>setHide(!hide)}  to="/tickets"><h3>All Tickets</h3></Link>
</li>
<li>                            <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
</li>
    
    </ul>
    </>
    : auth == 1 ?
    <>
                <button onClick={()=>setHide(!hide)}><FaBeer  /> Menu</button>
    <ul>
        <li>                                <Link onClick={()=>setHide(!hide)}  to="/"><h3>Home</h3></Link>
</li>
<li>                            <Link onClick={()=>setHide(!hide)} to="/profile">My profile</Link>
</li>

<li>                                <Link onClick={()=>setHide(!hide)} to="/create-ticket">Raise a ticket</Link>
</li>
<li>                                <Link onClick={()=>setHide(!hide)}  to="/tickets"><h3>My Tickets</h3></Link>
</li>
<li>                                <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
</li>
    </ul>
    </>
    : 
    <>
                <button onClick={()=>setHide(!hide)}><FaBeer  /> Menu </button>
    <ul>
    <li>                                <Link onClick={()=>setHide(!hide)}  to="/"><h3>Home</h3></Link>
    </li>
    <li>                                <Link onClick={()=>setHide(!hide)}  to="/signup"><h3>Sign up</h3></Link>
    </li>
    <li>                                <Link onClick={()=>setHide(!hide)}  to="/login"><h3>Log in</h3></Link>
    </li>
    {/* </> */}
    </ul>
    </>
}
</div>
</motion.aside>

}
            <Outlet />

            </>

    );
}
export default Navbar;