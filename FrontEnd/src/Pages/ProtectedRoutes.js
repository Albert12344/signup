import React from 'react'
import { Outlet } from 'react-router-dom'
import StudentLogin from '../Login/studentLogin'
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const useAuth = ()=>{
    const auth = {isAuthenicated: cookies.get("TOKEN")}
    return auth && auth.isAuthenicated 
}


const ProtectedRoutes = () =>{
const auth = useAuth()
    return(
        <>
        {auth ? <Outlet /> : <StudentLogin />}
        </>
    )
}

export default ProtectedRoutes