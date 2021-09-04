import React from 'react'
import { ErrorScreen } from './ErrorScreen'
import iconNoConn from '../assets/icons/cloud-storage.png'
export const ErrorConnection = () => {
    return (
        <ErrorScreen 
            icon={iconNoConn}
            title="Falla de conexion"
            message="Intentamos cumplir tu solicitud pero parace que no tienes conexion a internet"
            
        />
    )
}
