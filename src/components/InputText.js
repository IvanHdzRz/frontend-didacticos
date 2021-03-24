import React from 'react'
import warningIcon from '../assets/icons/warning.png'

export const InputText = ({name,label, error,errorMessage}) => {
    return (
        <div className="m-2">
            <label 
                for={name}
                className={`capitalize text-gray-700 font-bold`}  
            >
                {label}
            </label>
            <input
                id={name}
                name={name} 
                type="text"
                className={`
                    h-8  px-2 w-full mt-2
                    border-solid border-2 border-pink-500 rounded outline-none 
                    focus:ring focus:ring-red-500 focus:ring-opacity-50 
                `}
            />
            {
                error&&
                <label for={name} className="text-red-500 flex items-center">
                    <img src={warningIcon} className="h-4 m-1" alt='icon-warning' /> {errorMessage}
                </label>
            }
         </div>
    )
}
