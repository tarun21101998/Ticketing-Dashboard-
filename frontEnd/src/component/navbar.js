import { Link, useNavigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";import "./App.css"
const Navbar = () => {
    const auth1 = sessionStorage.getItem('isType');
    let auth = JSON.parse(auth1)
    const navigate = useNavigate();
    // console.log(auth)
    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('isType')
        sessionStorage.removeItem('isActive')
        navigate('/signup')
    }
        return (
        <>
{/* <div style={{border: "5px solid white", width: "100%", height: "20px"}}></div> */}
<div className="navbar">
    {
    auth == 0 || auth==2 ?
    <ul>
        <li>                            <Link to="/profile">My profile</Link>
</li>

    <li>                            <Link to="/">Home</Link>
</li>
<li>                            <Link to="/users"><h3>Dashboard</h3></Link>

</li>
<li>                            <Link to="/tickets"><h3>All Tickets</h3></Link>
</li>
<li>                            <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
</li>
    
    </ul>
    : auth == 1 ?
    <ul>
        <li>                                <Link to="/"><h3>Home</h3></Link>
</li>
<li>                            <Link to="/profile">My profile</Link>
</li>

<li>                                <Link to="/create-ticket">Raise a ticket</Link>
</li>
<li>                                <Link to="/tickets"><h3>My Tickets</h3></Link>
</li>
<li>                                <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
</li>
    </ul>
    : 
    <ul>
    <li>                                <Link to="/"><h3>Home</h3></Link>
    </li>
    <li>                                <Link to="/signup"><h3>Sign up</h3></Link>
    </li>
    <li>                                <Link to="/login"><h3>Log in</h3></Link>
    </li>
    </ul>
}
</div>

            <Outlet />
        </>

    );
}
export default Navbar;