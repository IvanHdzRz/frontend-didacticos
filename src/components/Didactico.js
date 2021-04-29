import React from 'react'

export const Didactico = ({number,title,type,stock,stockLevel,delayAnimation}) => {
    
    
    return (
        <div className="animate-showUp opacity-0 bg-white mb-1 grid grid-cols-12 place-items-center py-4  px-2 gap-x-2 " style={{['--order']:delayAnimation}} >
            <p className='col-span-1 text-gray-500'> 
                {number}
            </p>
            <h3 className='w-full col-span-6 place-self-start text-indigo-900 font-bold  capitalize truncate'>
                {title}
            </h3>
            <div className='col-span-2 rounded-full border-solid border-2 py-1 px-2 border-blue-500 text-blue-500 uppercase text-xs'>
                {type}
            </div>
            <div className='col-span-3 flex items-center'>
                <div className={` w-2 h-2 m-1 rounded-full ${stockLevel==='alto'?'bg-green-700':stockLevel==='medio'?'bg-yellow-500':'bg-red-700' } `} >
                </div>
                <p className='text-xs'>{stock} pzs</p>
            </div>
        </div>
    )
}
