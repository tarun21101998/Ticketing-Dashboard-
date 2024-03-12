  import React from "react";
  import EditTicket from "./component/editTicket";
import Profile from "./component/profile";
import MyRequests from "./component/user_request/index";
import SignUp from "./component/login_and_signup/signUp";
import CreateRequests from "./component/user_request/requests";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./component/navbar";
import Login from "./component/login_and_signup/login";
import Listing from "./component/listing/listing";
import Home from "./component/home";

const App = ()=>{

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <Home /> },
        { path: "/users", element: <Listing /> },
        { path: "/login", element: <Login /> },
        {path: "/create-ticket", element: <CreateRequests />},
        {path: "/signup", element: <SignUp/>},
        {path: "/tickets", element: <MyRequests />},
        {path: "/profile", element: <Profile />},
        {path: "/editTicket/:id", element: <EditTicket />}
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
export default App;