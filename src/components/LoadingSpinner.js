import React from 'react'
import loadIcon from '../assets/icons/load.png'
export const LoadingSpinner = () => {
    return (
        <div className='w-full h-80 flex justify-center items-center'>
            <img src={loadIcon} alt='cargando' className='h-12 w-12 opacity-50 animate-spin' />
        </div>
    )
}
