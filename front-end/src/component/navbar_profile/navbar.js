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
<nav className="navbar">
    {
    auth === 0 || auth===2 ?
    <ul className="nav-list">
        <li>                                <Link to="/profile">My profile</Link>
        </li>
        <li>                            <Link to="/">Home</Link></li>
        <li><Link to="/users">Dashboard</Link></li>
        <li><Link to="/tickets">All Tickets</Link></li>
    <li><Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link></li>
    </ul>
    : auth===1 ?
    <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">My profile</Link></li>
        <li><Link to="/create-ticket">Raise a ticket</Link></li>
        <li><Link to="/tickets">My Tickets</Link></li>
        <li><Link to="/login" onClick={logout}>Logout {JSON.parse(auth).name}</Link></li>
        </ul>
        :
        <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
            <li><Link to="/signup">Sign up </Link></li>
            <li><Link to="/login">Login</Link></li>
    </ul>
}
</nav>
            <Outlet />

        </>

    );
}

export default Navbar;