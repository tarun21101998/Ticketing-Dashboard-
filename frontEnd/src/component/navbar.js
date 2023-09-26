import { Link, useNavigate,  Outlet } from "react-router-dom";
import "./App.css"

const Navbar = ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    console.log(auth)
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }

    return (
        <>
        <div className="home">
            {
            auth ?
            <>
            <Link to="/">Home</Link> 
            <Link to="/users"><h3>Dashboard</h3></Link>
            <Link onClick={logout} to="/login">Logout { JSON.parse(auth).name}</Link> 
            </>
            : 
            <>
            <Link to="/"><h3>Home</h3></Link>
            <Link to="/login"><h3>Login</h3></Link>
            </>
}
    </div>
    <Outlet />
    </>
        
    );
}
export default Navbar;