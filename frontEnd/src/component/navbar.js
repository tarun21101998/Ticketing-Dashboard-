import { Link, Outlet } from "react-router-dom";
import "./App.css"

const Navbar = ()=>{
    return (
        <>
        <div className="home">
        <Link to="/"><h3>Home</h3></Link>
        <Link to="/users"><h3>Dashboard</h3></Link>
        <Link to="/login"><h3>signIn</h3></Link>
    </div>
    <Outlet />
    </>
        
    );
}
export default Navbar;