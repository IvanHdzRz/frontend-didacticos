import React from 'react'
import { InformationScreen } from './InformationScreen'
import iconNoConn from '../assets/icons/cloud-storage.png'
export const ErrorConnection = ({onRetry=()=>{}}) => {
    return (
        <InformationScreen 
            icon={iconNoConn}
            title="Falla de conexion"
            message="Intentamos cumplir tu solicitud pero parace que el servidor no esta disponible en este momento"
            onRetry={onRetry}
        />
    )
}
