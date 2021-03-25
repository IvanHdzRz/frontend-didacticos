import React from 'react'
import {InputText} from '../components/InputText'
import {SeccionTitle} from '../components/SeccionTitle'

export const FormNewDidactico = () => {
    return (
        <div className="bg-gray-200 min-h-screen">
            <SeccionTitle title="Agregar nuevo didactico"/>
            <InputText name="ejemplo" label="prueba" error={true} errorMessage="este campo en obligatorio"/>
            <InputText name="numero" label="numero" error={true} errorMessage="la cagaste" />
        </div>
    )
}
