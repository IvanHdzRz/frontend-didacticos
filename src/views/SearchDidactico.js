import React, { useContext, useState } from 'react'
import {Link} from "react-router-dom";
import {SeccionTitle} from '../components/SeccionTitle'
import {SearchBar} from '../components/SearchBar'
import {useFetch} from '../hooks/useFetch'
import {apiUrl} from '../env/apiurl'
import {getApiQueryParams} from '../helper/getApiQueryParams'
import { Didactico } from '../components/Didactico'
import { FloatButtonAdd } from '../components/FloatButtonAdd'
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getAuthHeader } from '../helper/getAuthHeader';
import AppContext from '../context/appContext';
import { ErrorScreen } from '../components/ErrorScreen';


export const SearchDidactico = () => {
    const {state}= useContext(AppContext)
    const {authToken}=state
    const [lastSearch, setlastSearch] = useState('')
    const [url, seturl] = useState(`${apiUrl}/didacticos/low_stock`)
    const [keyWords, setkeyWords] = useState('')
    const {data,loading,error,statusCode,refresh}=useFetch(url,{
        method: 'GET',
        headers: getAuthHeader({authToken}),
        redirect: 'follow'
    })
    
    const handleChange=({target})=>{
        setkeyWords(target['value'])
    }
    
    const handleSearch=(e)=>{
        e.preventDefault();
        console.log('voy a buscar')
        setlastSearch(keyWords)
        const queryParams=getApiQueryParams(keyWords)
        seturl(`${apiUrl}/didacticos/search?${queryParams}`)
    }

    
    return (
        <div className="bg-gray-100 min-h-screen pb-8">
            <div className="mb-4">
                <SeccionTitle title="Materiales Didacticos"/>
            </div>
            <form className="p-2">
                <SearchBar onSearch={handleSearch} onChange={handleChange} value={keyWords}/>
                <div id="refiners">

                </div>
            </form>
            {
                loading?
                    <LoadingSpinner />
                    :
                    error||statusCode!==200?
                        <div className="w-full h-full flex justify-center items-center ">
                            <ErrorScreen error={error} statusCode={statusCode} onRetry={refresh}/>
                        </div>
                        :
                        <div id="results" className="p-4">
                            <p className="text-gray-500 text-lg font-bold mb-4">
                                {
                                    lastSearch===''? 
                                    <> Didacticos con bajas existencias</> :
                                    <>{data.length} Resultado{data.length!==1&&'s'} para:<span className="text-pink-500">"{lastSearch}"</span></>
                                }
                                
                            </p>
                            <div id="didacticosContainer">
                                {data.map(({tipo,numero,nombre,existencias,nivelStock},i)=>(
                                    <Link 
                                        key={`${tipo}${numero}`}
                                        to={`/detalles?tipo=${tipo}&numero=${numero}`}
                                    >
                                        <Didactico 
                                            number={numero} 
                                            title={nombre} 
                                            type={tipo} 
                                            stock={existencias} 
                                            stockLevel={nivelStock}
                                            delayAnimation={i}
                                        />
                                    </Link>
                                    
                                ))}
                            </div>
                            
                        </div>
            }
            <FloatButtonAdd />
        </div>
    )
}
