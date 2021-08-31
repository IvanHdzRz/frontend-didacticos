import React from 'react'
import Style from './Modal.module.css'
export const Modal = ({children,close}) => {
    
    return (
        <div className={Style.modalBackground} onClick={(e)=>{e.target === e.currentTarget && close() }}>
            <div className={Style.modalBody}>
                <button onClick={close}className={Style.modalClose}>X</button>
                {children}
            </div>
        </div>
    )
}
