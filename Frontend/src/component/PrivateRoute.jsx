
import { Navigate,Outlet } from "react-router-dom";

import React, { useContext } from 'react'
import { AuthContext } from "../context/AuthContext";

const PrivateRoute=()=>{

     const {user}=useContext(AuthContext);
   
    
        if(!user){

            return <Navigate to="/login"/>
        }

        return <Outlet/>
}

export default PrivateRoute;
