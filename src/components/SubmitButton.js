import React from 'react'
import loadIcon from '../assets/icons/loading-process.png'

export const SubmitButton = ({isSubmiting=false,text="enviar",onSubmitText="enviando"}) => {
    return (
        <button 
            type="submit"  
            className={`w-full flex justify-center items-center px-4 py-2 space-x-2 ${isSubmiting?'bg-pink-300':'bg-pink-600'} rounded border-pink-600 border-2 text-center font-bold text-white text-md capitalize`}
            disabled={isSubmiting}
        > 
            <p>{isSubmiting?onSubmitText:text}</p>
            {isSubmiting&& <img src={loadIcon} alt="loading" className="w-5 h-5 animate-spin"/>}
            
        </button>
    )
}
