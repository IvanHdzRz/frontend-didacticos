import React from 'react'
import reloadIcon from '../assets/icons/rotate.png'

export const ErrorScreen = ({message="ha ocurrido un error", retryMessage="Volver ha intentar",onRetry=window.location.reload}) => {
    return (
        <div className="capitalize text-xl text-gray-700 flex  flex-col justify-center items-center h-50">
            <span
                className="p-5"
            >
                {message}
            </span> 
            <button 
                onClick={onRetry}
                className="w-full flex flex-col justify-center items-center px-4 py-2 space-y-4"    
            >
                <span>{retryMessage}</span>
                <img src={reloadIcon} alt="reload" className="w-10 h-10 " />
            </button>
        </div>
    )
}
