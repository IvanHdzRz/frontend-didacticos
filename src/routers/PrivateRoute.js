import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AppContext from '../context/appContext'



export const PrivateRoute = ({exact,path,component:Component, routePermission=true}) => {
    const{state}= useContext(AppContext)
    const {authToken,userPermissions}=state
    
    return (
        <Route exact={exact} path={path}>
            {authToken===null?   
                <Redirect to="/login" />:
                routePermission===true? 
                    <Component />:
                    userPermissions.includes(routePermission)?
                        <Component />:
                        <Redirect to="/"/>    
            }
        </Route>
    )
}
