import React from 'react'
import { ErrorScreen } from './ErrorScreen'
import iconErrServer from '../assets/icons/alert.png'
export const ErrorServer = () => {
    return (
        <ErrorScreen 
            icon={iconErrServer}
            title="Servidor no disponible"
            message="Nuestros servidores estan en llamas, intentalo mas tarde"
            
        />
    )
}
