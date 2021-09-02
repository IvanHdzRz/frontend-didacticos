import React, { useReducer } from 'react'
import {initialState,appReducer} from '../reducers/appReducer'
import AppContext from '../context/appContext'

export const AppState = (props) => {
    
    const [state, dispatch] = useReducer(appReducer, initialState)


    return (
        <AppContext.Provider value={{state, dispatch}}>
            {props.children}
        </AppContext.Provider>
    )
}
