import React, { useContext, useEffect, useState } from 'react'
import {useHistory, useLocation} from "react-router-dom";
import {SeccionTitle} from '../components/SeccionTitle'
import {apiUrl} from '../env/apiurl'
import { useFetch } from '../hooks/useFetch'
import printIcon from '../assets/icons/printing.png'
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorScreen } from '../components/ErrorScreen';
import AppContext from '../context/appContext';
import { getAuthHeader } from '../helper/getAuthHeader';
import { ButtonWithIcon } from '../components/ButtonWithIcon';
import deleteIcon from '../assets/icons/trash.png'
import editIcon from '../assets/icons/pencil.png'
import { useModal } from '../hooks/useModal';
import { Modal } from '../components/Modal';
import { InformationScreen } from '../components/InformationScreen';
import iconSuccess from '../assets/icons/checked.png'
export const DetailsDidactico = () => {
    const {state}= useContext(AppContext)
    const {authToken}=state
    const query = useQuery();
    const numero=query.get('numero')
    const tipo=query.get('tipo')
    const history= useHistory()
    const [deleteState, setdeleteState] = useState({deleteInProgress:false,deleteStatus:null,deleteError:null});
    const {deleteStatus,deleteInProgress,deleteError}=deleteState
    const[isVisible,openModal,closeModal] = useModal({visible:false})
    const fetchOptions={
        method: 'GET',
        headers: getAuthHeader({authToken}),
        redirect: 'follow'
    }
    const {data,loading,error,statusCode,refresh}=useFetch(`${apiUrl}/didacticos/id?tipo=${tipo}&numero=${numero}`,fetchOptions)
    
    //redirige al inicio
    useEffect(() => {
        //si se logro borrar el didactico y el modal se cerro
        //redirige al inicio
        if(deleteStatus===201&&!isVisible){
            history.push("/");
        }
    }, [deleteStatus,isVisible])

    const onDelete=(e)=>{
        e.preventDefault();
        openModal();
        setdeleteState({deleteInProgress:true,deleteStatus:null,deleteError:null})
        const req=fetch(`${apiUrl}/didacticos/`,{
            ...fetchOptions,
            method:"DELETE",
            body:JSON.stringify({numero,tipo})
        }).then((res)=>{
            console.log(res)
            setdeleteState({deleteInProgress:false,deleteStatus:res.status,deleteError:null})
        }).catch((e)=>{
            setdeleteState({deleteInProgress:false,deleteStatus:null,deleteError:e})
        })
        
    }

    const {nombre,img,pdf,existencias,nivelStock,tags}=data || {}    
    return (
        <div className="bg-gray-100 min-h-screen pb-8 ">
            {
                loading?
                    <LoadingSpinner />:
                    error||statusCode!==200?
                        <div className="w-full min-h-screen flex justify-center items-center">
                            <ErrorScreen error={error} statusCode={statusCode} onRetry={refresh}/>
                        </div>
                        :
                        <div className="p-2 grid grid-cols-12 gap-y-4 ">
                            <div className="col-span-12">
                                <SeccionTitle title={`${nombre}`}/>
                            </div>
                            <div className="col-span-12 flex flex-row items-center justify-between">
                                <p className="col-span-6 capitalize text-xl text-gray-700">
                                    {`${tipo} # ${numero}`}
                                </p>
                                <button
                                    className="w-40 px-2 py-1 flex justify-center items-center bg-pink-500 rounded border-pink-400 border-2 text-center font-bold text-white "
                                    onClick={()=>{window.open(pdf,'_blank')}}
                                >
                                    <img src={printIcon} alt="printer" className="w-6 h-6 mx-2" />
                                    imprimir
                                </button>
                            </div>
                            
                            <img src={img} className="col-span-12 place-self-center" alt='preview didactico' />
                            
                            <div className="col-span-12 flex flex-row space-x-2 justify-between ">
                                <div className="justify-self-start flex items-center">
                                    <div className={` w-2 h-2 m-1 rounded-full ${nivelStock==='alto'?'bg-green-700':nivelStock==='medio'?'bg-yellow-500':'bg-red-700' } `} >
                                    </div>
                                    <p className='text-xl'>{existencias} pzs</p>
                                </div>
                                <div className="flex flex-row space-x-2 ">
                                    {/* <ButtonWithIcon text={"Editar"} icon={editIcon} /> */}
                                    <ButtonWithIcon text={"Eliminar"} icon={deleteIcon} onClick={onDelete}/>
                                </div>
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
                {
                    isVisible&&
                    <Modal close={closeModal} closeable={!deleteInProgress}>
                        {
                            deleteInProgress?
                                <div>
                                    <h2>Borrando...</h2>
                                    <LoadingSpinner />
                                </div>:
                                deleteStatus===201?
                                    <InformationScreen 
                                        icon={iconSuccess} 
                                        title="Listo!" 
                                        message="didactico borrado con exito"
                                        
                                    />:
                                    <ErrorScreen error={deleteError} statusCode={deleteStatus} />
                        }
                    </Modal>
                
                }
            </div>
    )
}
function useQuery() {
    return new URLSearchParams(useLocation().search);
}