import React from 'react'
import Style from './Modal.module.css'
export const Modal = ({children,close,closeable=true}) => {
    
    return (
        <div className={Style.modalBackground} onClick={(e)=>{e.target === e.currentTarget && closeable&& close() }}>
            <div className={Style.modalBody}>
                <button onClick={()=>{closeable&&close()}}className={Style.modalClose}>X</button>
                <div className={Style.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}
