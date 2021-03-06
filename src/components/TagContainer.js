import React from 'react'
import { Label } from './Label'
import { WarningLabel } from './WarningLabel'

export const TagContainer = ({ field:{name,value,onChange,onBlur} ,form:{touched,errors},label,disabled}) => {
    return (
        <>
        <Label forName={name} label={label} />
        <textarea 
            id={name}
            name={name} 
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            autoComplete="off"
            disabled={disabled}
            className={`
                    h-40  p-2 w-full mt-2 mb-1
                    text-xl
                    border-solid border-2 border-pink-300 rounded outline-none 
                    focus:ring focus:ring-red-500 focus:ring-opacity-50 
                    resize-none	
                `}
        />
        {
            touched[name]&&
            errors[name]&&
            <WarningLabel forName={name} warnMessage={errors[name]} />
        }
        </>
    )
}
