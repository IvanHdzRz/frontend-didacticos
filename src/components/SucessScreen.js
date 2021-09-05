import React from 'react'
import { InformationScreen } from './InformationScreen'
import iconSuccess from '../assets/icons/diskette.png'
export const SucessScreen = ({title="Tarea completada", message="solicitus completada con exito"}) => {
    return (
        <InformationScreen icon={iconSuccess} title={title} message={message} />
    )
}
