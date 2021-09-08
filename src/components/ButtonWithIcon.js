import React from 'react'

export const ButtonWithIcon = ({icon,text,onClick}) => {
    return (
        <button 
            className="flex flex-row justify-center items-center rounded border-2 border-gray-300 p-2 space-x-2"
            onClick={onClick}
        >
            <p className="text-base text-gray-500">
                {text}
            </p>
            <img 
                src={icon} 
                alt="iconBtn"
                className="w-4"
            /> 
        </button>
    )
}
