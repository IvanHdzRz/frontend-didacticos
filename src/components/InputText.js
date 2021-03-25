import React from 'react'
import { WarningLabel } from './WarningLabel'

export const InputText = ({ field:{name,value,onChange,onBlur} ,form:{touched,errors}}) => {
    return (
        <>
            <input
                id={name}
                name={name} 
                value={value}
                type="text"
                className={`
                    h-10  px-2 w-full mt-2 mb-1
                    text-xl
                    border-solid border-2 border-pink-500 rounded outline-none 
                    focus:ring focus:ring-red-500 focus:ring-opacity-50 
                `}
                onChange={onChange}
                onBlur={onBlur}
            />
            {
                touched[name]&&
                errors[name]&&
                <WarningLabel forName={name} warnMessage={errors[name]} />
            }
         </>
    )
}
