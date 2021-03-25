import React from 'react'
import {InputText} from '../components/InputText'
import {SeccionTitle} from '../components/SeccionTitle'

export const FormNewDidactico = () => {
    return (
        <div className="bg-gray-200 min-h-screen">
            <SeccionTitle title="Agregar nuevo didactico"/>
            <form className="mt-8 px-2 grid grid-cols-2">
                <InputText name="numero" label="numero" error={true} errorMessage="este campo en obligatorio"/>
                <InputText name="tipo" label="tipo" error={true} errorMessage="la cagaste" />
                <div className="col-span-full">
                    <InputText name="Nombre" label="Nombre" error={true} errorMessage="usted no entiende verdad?" />
                </div>
                <InputText name="existencias" label="existencias" error={false} errorMessage="la cagaste" />
            </form>
        </div>
    )
}
