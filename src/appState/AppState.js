import React, { useEffect, useReducer } from 'react'
import {initialState,appReducer} from '../reducers/appReducer'
import AppContext from '../context/appContext'
import {apiUrl}from '../env/apiurl'
import jwt from 'jsonwebtoken'
import TYPES from '../types/appActions'

export const AppState = (props) => {
    
    const [state, dispatch] = useReducer(appReducer, initialState)
    const {silentLogin}=state
    //al iniciar intenta realizar un silentLogin
    useEffect(() => {
        fetch(`${apiUrl}/refresh_token`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            credentials: 'include',
        })
            .then(res=>res.json())
            .then(({token})=>{
                const decode= jwt.decode(token)
                dispatch({
                    type:TYPES.SET_AUTH_DATA,
                    payload:{
                        authToken:token,
                        userName:decode.userName,
                        userPermissions:decode.userPermissions
                    }
                })
                dispatch({
                    type:TYPES.SET_SILENT_LOGIN,
                    payload:{
                        loading:false,
                        error:null
                    }
                })
            }).catch(e=>{
                dispatch({
                    type:TYPES.SET_SILENT_LOGIN,
                    payload:{
                        loading:false,
                        error:e
                    }
                })
            })
    }, [])
    
    if(silentLogin.loading){
        return <p>cargando</p>
    }

    return (
        
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
}
