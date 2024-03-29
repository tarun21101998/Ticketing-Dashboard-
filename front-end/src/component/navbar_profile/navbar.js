import { Link, useNavigate, Outlet } from "react-router-dom";
import React from "react";
import "../CSS/navbar.css"
// function for nav_bar
const Navbar = () => {
    const auth_1 = sessionStorage.getItem('isType');
    let auth = JSON.parse(auth_1)
    const navigate = useNavigate();

// function for logging out and clearing the  session storage and  navigate to sign_up page
    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isType')
        sessionStorage.removeItem('isActive')
        navigate('/signup')
    }


    return (
        <>
<div className="navbar">
    <img src="data:image/jpeg;base64,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"/>
    {
    auth === 0 || auth===2 ?
    <div className="innerDiv">
        <span>                            <Link to="/profile">My profile</Link>
</span>

    <span>                            <Link  to="/">Home</Link>
</span>
<span>                            <Link to="/users">Dashboard</Link>
</span>
<span>                            <Link to="/tickets">All Tickets</Link>
</span>
<span>                            <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
</span>
    </div>
    : auth === 1 ?
    <div className="innerDiv">
        <span>                                <Link to="/">Home</Link>
</span>
<span>                            <Link to="/profile">My profile</Link>
</span>
<span>                                <Link to="/create-ticket">Raise a ticket</Link>
</span>
<span>                                <Link to="/tickets">My Tickets</Link>
</span>
<span>                                <Link to="/login" onClick={logout}>Logout {JSON.parse(auth).name}</Link>
</span>
    </div>
    : 
    <div className="innerDiv">
    <span>                                <Link to="/"><h3>Home</h3></Link>
    </span>
    <span style={{display: "flex", marginLeft: "80%"}}>                                <Link to="/signup"><h3>Sign up /</h3></Link>  <Link to="/login"><h3>Log in</h3></Link>
    </span>
    </div>
}
</div>
            <Outlet />

            </>

    );
}

export default Navbar;