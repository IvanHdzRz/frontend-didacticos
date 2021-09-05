import React from 'react'
import { InformationScreen } from './InformationScreen'
import iconErrServer from '../assets/icons/alert.png'
export const ErrorServer = () => {
    return (
        <InformationScreen 
            icon={iconErrServer}
            title="Servidor no disponible"
            message="Nuestros servidores estan en llamas, intentalo mas tarde"
            
        />
    )
}
