import React from 'react'

export const Button = ({onClick,children,disabled=false}) => {
    return (
        <button 
            onClick={(e)=>{e.preventDefault(); onClick()}} 
            className="px-4 py-2  bg-white rounded border-pink-400 border-2 text-center font-bold text-pink-400 text-xs"
            disabled={disabled}
        >
            {children}
        </button>
    )
}
