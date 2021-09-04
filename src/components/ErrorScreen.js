import React, { useEffect, useState } from 'react'
import reloadIcon from '../assets/icons/refresh.png'
import errorIcon from '../assets/icons/bandage.png'
export const ErrorScreen = ({icon=errorIcon,title="Ooops!", message="Ha ocurrido un error", retryMessage="Volver ha intentar",onRetry=()=>{}}) => {
    const [clicked, setclicked] = useState(false)
    
    useEffect(() => {
        
        const idTimeOut=setTimeout(()=>{
            clicked&&setclicked(false)
        },500)
        
        return () => {
            clearTimeout(idTimeOut)
        }
    }, [clicked])
    const handleClick=()=>{
        setclicked(true);
        onRetry();
    }
    
    return (
        <div className="text-gray-700 flex  flex-col justify-center items-center h-screen w-screen space-y-5 p-5">
            <img src={icon} alt="error-icon" className="w-32"/>
            <h3 className="text-3xl font-extrabold text-center">
                {title}
            </h3>
            <p className="font-light text-xl text-center">
                {message}
            </p>
            <button onClick={handleClick} className="flex space-x-4 border border-gray-600 rounded p-2 font-medium">
                <span>{retryMessage}</span> 
                <img  src={reloadIcon} alt="retry" className={`h-6 ${clicked&&"animate-spin"}`}/>
            </button>
        </div>
    )
}
