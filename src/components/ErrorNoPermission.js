import React from 'react'
import { InformationScreen } from './InformationScreen'
import iconForbidden from '../assets/icons/forbidden.png'
export const ErrorNoPermission = () => {
    return (
        <InformationScreen 
            icon={iconForbidden}
            title="No deberias estar viendo esto"
            message="No tienes acceso a esta parte de la aplicacion, sentimos las molestias"
            
        />
    )
}
