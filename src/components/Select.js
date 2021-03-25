import React from 'react'
import { Label } from './Label'
import {WarningLabel} from './WarningLabel'

export const Select = ({field:{name,value,onChange,onBlur} ,form:{touched,errors},label,options}) => {
    return (
        <div>
            <Label forName={name} label={label} />
            <select 
                name={name} 
                id={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                className={`
                    bg-white h-10 px-2 w-full mt-2 mb-1
                    text-xl font-bold text-pink-500 capitalize
                    border-solid border-2 border-pink-500 rounded outline-none 
                    focus:ring focus:ring-red-500 focus:ring-opacity-50
                `}
            >
                {
                    options.map((opt,i)=>(
                        <option 
                            value={opt.value} 
                            key={`name_${i}`} 
                            className={`capitalize text-gray-500 font-bold`}
                            
                        >
                            {opt.name}
                        </option>
                    ))
                }
            </select>
            {
                touched[name]&&
                errors[name]&&
                <WarningLabel forName={name} warnMessage={errors[name]} />
            }
        </div>
    )
}
