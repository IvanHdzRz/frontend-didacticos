import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import AppContext from '../context/appContext'



export const PrivateRoute = ({exact,path,component:Component}) => {
    const{state}= useContext(AppContext)
    const {authToken}=state
    return (
        <Route exact={exact} path={path}>
            {authToken?<Component />:<Redirect to="/login" />}
        </Route>
    )
}
