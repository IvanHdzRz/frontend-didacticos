import React, { useContext } from 'react'
import { ButtonWithIcon } from './ButtonWithIcon'
import LogoutIcon from '../assets/icons/logout.png'
import {apiUrl} from '../env/apiurl'
import AppContext from '../context/appContext'
import TYPES from '../types/appActions'
import { useModal } from '../hooks/useModal'
import { ErrorConnection } from './ErrorConnection'
import { Modal } from './Modal'

export const Logout = ({onError}) => {
    const {dispatch}=useContext(AppContext)
    const [isVisibleErrLogout,openErrorLogout,closeErrorLogout]= useModal({visible:false});
    
    const handleLogout=async()=>{
        try{
            const req =await fetch(`${apiUrl}/logout`,{
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                credentials: 'include',
            })
            if(req.status===200||req.status===201){
                dispatch({type:TYPES.LOGOUT});
            }
        }catch(e){
                openErrorLogout();
        }
        
    }
    return (
        <>
            <ButtonWithIcon text="cerrar sesion" icon={LogoutIcon} onClick={handleLogout} />
            {
                isVisibleErrLogout&&
                <Modal close={closeErrorLogout}>
                    <ErrorConnection onRetry={handleLogout} />
                </Modal>
            }
        </>
    )
}
