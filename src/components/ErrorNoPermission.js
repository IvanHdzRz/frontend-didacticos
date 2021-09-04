import React from 'react'
import { ErrorScreen } from './ErrorScreen'
import iconForbidden from '../assets/icons/forbidden.png'
export const ErrorNoPermission = () => {
    return (
        <ErrorScreen 
            icon={iconForbidden}
            title="No deberias estar viendo esto"
            message="No tienes acceso a esta parte de la aplicacion, sentimos las molestias"
            
        />
    )
}
