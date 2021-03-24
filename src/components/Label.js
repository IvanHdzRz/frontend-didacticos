import React from 'react'

export const Label = ({forName,label}) => {
    return (
        <label 
            for={forName}
            className={`capitalize text-xl text-gray-700 font-bold`}  
        >
            {label}
        </label>
    )
}
