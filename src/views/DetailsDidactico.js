import React from 'react'
import {SeccionTitle} from '../components/SeccionTitle'
import {apiUrl} from '../env/apiurl'
import { useFetch } from '../hooks/useFetch'

export const DetailsDidactico = ({numero, tipo}) => {
    const {data,loading,error}=useFetch(`${apiUrl}/didacticos/id?tipo=${tipo}&numero=${numero}`)
     
    return (
        <div className="bg-gray-100 min-h-screen pb-8">
            {
                loading?<p>cargando</p> :
                <>
                    <SeccionTitle title="titulo didactico"/>
                    <button>
                        imprimir
                    </button>
                    <img src="" alt='preview didactico' />
                    <p></p><div> existencias: </div>
                    <h3>tags</h3>
                </>
            }
        </div>
    )
}
