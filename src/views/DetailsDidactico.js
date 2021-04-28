import React from 'react'
import {SeccionTitle} from '../components/SeccionTitle'
import {apiUrl} from '../env/apiurl'
import { useFetch } from '../hooks/useFetch'

export const DetailsDidactico = ({numero, tipo}) => {
    const {data,loading,error}=useFetch(`${apiUrl}/didacticos/id?tipo=${tipo}&numero=${numero}`)
   
     const {nombre,img,pdf}=data || {}
    
    return (
        <div className="bg-gray-100 min-h-screen pb-8">
            {
                loading?<p>cargando</p> :
                <div className="p-2">
                    <SeccionTitle title={nombre}/>
                    <button
                        className="px-2 py-1  bg-pink-500 rounded border-pink-400 border-2 text-center font-bold text-white"
                        onClick={()=>{window.open(pdf,'_blank')}}
                    >
                        imprimir
                    </button>
                    <img src={img} className="w-full" alt='preview didactico' />
                    <p></p><div> existencias: </div>
                    <h3>tags</h3>
                </div>
            }
        </div>
    )
}
