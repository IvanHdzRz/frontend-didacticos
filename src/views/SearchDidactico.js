import React, { useState } from 'react'
import {SeccionTitle} from '../components/SeccionTitle'
import {SearchBar} from '../components/SearchBar'
import {useFetch} from '../hooks/useFetch'
import {apiUrl} from '../env/apiurl'
import {getApiQueryParams} from '../helper/getApiQueryParams'
import loadIcon  from '../assets/icons/load.png'
import { Didactico } from '../components/Didactico'

export const SearchDidactico = () => {
    const [lastSearch, setlastSearch] = useState('')
    const [url, seturl] = useState(null)
    const [keyWords, setkeyWords] = useState('')
    const {data,loading}=useFetch(url)
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

    !loading&&console.log(data)
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
                    <div className='w-full h-80 flex justify-center items-center'>
                        <img src={loadIcon} alt='cargando' className='h-12 w-12 opacity-50 animate-spin' />
                    </div>
                    :
                    <div id="results" className="p-4">
                        <p className="text-gray-500 text-lg font-bold mb-4">
                            {data.length} Resultado{data.length!==1&&'s'} para:<span className="text-pink-500">"{lastSearch}"</span> 
                        </p>
                        <div id="didacticosContainer">
                            {data.map((didactico,i)=>(
                                <Didactico 
                                    key={`${didactico.tipo}${didactico.numero}`}
                                    number={didactico.numero} 
                                    title={didactico.nombre} 
                                    type={didactico.tipo} 
                                    stock={didactico.existencias} 
                                    stockLevel={didactico['nivel de stock']}
                                    delayAnimation={i}
                                />
                            ))}
                        </div>
                    </div>
            }
        </div>
    )
}