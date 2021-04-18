import React from 'react'
import { Label } from './Label'
import { WarningLabel } from './WarningLabel'

export const InputText = ({ field:{name,value,onChange,onBlur} ,form:{touched,errors},label,disabled}) => {
    return (
        <div>
            <Label forName={name} label={label} />
            <input
                id={name}
                name={name} 
                value={value}
                type="text"
                className={`
                    h-10  px-2 w-full mt-2 mb-1
                    text-xl
                    border-solid border-2 border-pink-300 rounded outline-none 
                    focus:ring focus:ring-red-500 focus:ring-opacity-50 
                `}
                onChange={onChange}
                onBlur={onBlur}
                autoComplete="off"
                disabled={disabled}
            />
            {
                touched[name]&&
                errors[name]&&
                <WarningLabel forName={name} warnMessage={errors[name]} />
            }
         </div>
    )
}
