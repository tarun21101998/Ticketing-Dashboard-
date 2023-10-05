import { Link, useNavigate, Outlet } from "react-router-dom";
import jwt from "jwt-decode";import "./App.css"
const Navbar = () => {
    const auth1 = sessionStorage.getItem('token');
    let auth = JSON.parse(auth1)
    if(auth){
const tokenDecode = jwt(auth)

    // console.log(tokenDecode.firstName)
    auth = tokenDecode.isType
    }
    console.log(auth)
    const navigate = useNavigate();
    // console.log(auth)
    const logout = () => {
        sessionStorage.removeItem('token');
        navigate('/signup')
    }
        return (
        <>
<div className="navbar">
    {
    auth == true ?
    <ul>
    <li>                            <Link to="/">Home</Link>
</li>
<li>                            <Link to="/users"><h3>Dashboard</h3></Link>
</li>
<li>                            <Link to="/tickets"><h3>All Tickets</h3></Link>
</li>
<li>                            <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
</li>
    
    </ul>
    : auth == false ?
    <ul>
        <li>                                <Link to="/"><h3>Home</h3></Link>
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