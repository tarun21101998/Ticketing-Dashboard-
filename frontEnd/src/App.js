import React from "react";
import SignUp from "./component/signUp";
import CreateRequests from "./component/requests";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Navbar from "./component/navbar";
import Login from "./component/login";
import Listing from "./component/listing";
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
        {path: "/createrequest", element: <CreateRequests />},
        {path: "/signup", element: <SignUp/>}
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