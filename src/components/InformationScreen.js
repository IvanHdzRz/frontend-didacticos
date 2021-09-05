import React, { useEffect, useState } from 'react'
import reloadIcon from '../assets/icons/refresh.png'
import errorIcon from '../assets/icons/bandage.png'
export const InformationScreen = ({icon=errorIcon,title="Ooops!", message="Ha ocurrido un error", retryMessage="Volver ha intentar",onRetry=undefined}) => {
    const [clicked, setclicked] = useState(false)
    
    useEffect(() => {
        
        const idTimeOut=setTimeout(()=>{
            clicked&&setclicked(false)
        },500)
        
        return () => {
            clearTimeout(idTimeOut)
        }
    }, [clicked])
    const handleClick=(e)=>{
        setclicked(true);
        onRetry(e);
    }
    
    return (
        <div className="text-gray-700 flex  flex-col justify-center items-center w-60 space-y-5">
            <img src={icon} alt="error-icon" className="w-28"/>
            <h3 className="text-3xl font-extrabold text-center flex">
                {title}
            </h3>
            <p className="font-light text-base text-center flex">
                {message}
            </p>
            {
                onRetry!==undefined&&
                    <button onClick={handleClick} className="flex space-x-4 border border-gray-600 rounded p-2 font-medium">
                        <span>{retryMessage}</span> 
                        <img  src={reloadIcon} alt="retry" className={`h-6 ${clicked&&"animate-spin"}`}/>
                    </button>
            }
        </div>
    )
}
