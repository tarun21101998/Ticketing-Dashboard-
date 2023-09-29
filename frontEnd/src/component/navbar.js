import { Link, useNavigate, Outlet } from "react-router-dom";
import "./App.css"

const Navbar = () => {
    const auth1 = localStorage.getItem('isActive');
    const auth = JSON.parse(auth1)

    // const auth = false
    console.log(auth)
    const navigate = useNavigate();
    // console.log(auth)
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }

    return (
        <>
            <div className="home">
                {
                    auth == true ?
                        <>
                            <Link to="/">Home</Link>
                            <Link to="/users"><h3>Dashboard</h3></Link>
                            <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
                        </>
                        : auth == false ?
                            <>
                                <Link to="/"><h3>Home</h3></Link>
                                <Link to="/createrequest">createRequests</Link>
                                <Link onClick={logout} to="/login">Logout {JSON.parse(auth).name}</Link>
                            </>
                            :
                            <>
                                <Link to="/"><h3>Home</h3></Link>
                                <Link to="/signup"><h3>SignUp</h3></Link>
                                <Link to="/login"><h3>Login</h3></Link>
                            </>
                    // {/* </> */}
                }
            </div>
            <Outlet />
        </>

    );
}
export default Navbar;