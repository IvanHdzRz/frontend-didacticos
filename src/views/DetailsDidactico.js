import React from 'react'
import {useLocation} from "react-router-dom";
import {SeccionTitle} from '../components/SeccionTitle'
import {apiUrl} from '../env/apiurl'
import { useFetch } from '../hooks/useFetch'
import printIcon from '../assets/icons/printing.png'
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorScreen } from '../components/ErrorScreen';

export const DetailsDidactico = () => {
    const query = useQuery();
    const numero=query.get('numero')
    const tipo=query.get('tipo')
    const {data,loading,error}=useFetch(`${apiUrl}/didacticos/id?tipo=${tipo}&numero=${numero}`)
   
    const {nombre,img,pdf,existencias,nivelStock,tags}=data || {}
     console.log(data)
    
    return (
        <div className="bg-gray-100 min-h-screen pb-8 ">
            {
                loading?
                    <LoadingSpinner />:
                    error?
                        <ErrorScreen />:
                        <div className="p-2 grid grid-cols-12 gap-y-4 ">
                            <div className="col-span-12">
                                <SeccionTitle title={nombre}/>
                            </div>
                            <div className="col-start-7 col-span-6">
                                <button
                                    className="w-full px-2 py-1 flex justify-center items-center bg-pink-500 rounded border-pink-400 border-2 text-center font-bold text-white "
                                    onClick={()=>{window.open(pdf,'_blank')}}
                                >
                                    <img src={printIcon} alt="printer" className="w-6 h-6 mx-2" />
                                    imprimir
                                </button>
                            </div>
                            
                            <img src={img} className="col-span-12 place-self-center" alt='preview didactico' />
                            
                            <p className="col-span-6 capitalize text-xl text-gray-700">
                                {tipo}
                            </p>
                            <div className="col-span-6 justify-self-end flex items-center">
                                <div className={` w-2 h-2 m-1 rounded-full ${nivelStock==='alto'?'bg-green-700':nivelStock==='medio'?'bg-yellow-500':'bg-red-700' } `} >
                                </div>
                                <p className='text-xl'>{existencias} pzs</p>
                            </div>
                            <h3 className="cols-span-12 font-bold text-2xl text-indigo-900 capitalize">
                                tags:
                            </h3>
                            <div className="col-span-12 flex flex-wrap justify-start ">
                                {
                                    tags.map(({id,tag})=>
                                        <div 
                                            key={id} 
                                            className="bg-white border-pink-400 border-2 rounded-full px-2 py-1 m-2"
                                        > 
                                            {tag}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                }
            </div>
    )
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}