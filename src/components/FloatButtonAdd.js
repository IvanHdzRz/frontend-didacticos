import React from 'react'
import {Link} from "react-router-dom";
import addIcon from '../assets/icons/add.png'
export const FloatButtonAdd = () => {
    return (
        <Link 
            to="/agregar" 
            className="fixed right-8 bottom-8"
        >
            <button className="flex justify-center items-center py-2 px-4 rounded-full bg-white border-pink-500 text-pink-700 border-2 font-bold capitalize ">
                <img src={addIcon} className="h-4 w-4 mr-2" alt='add'/>
                agregar
            </button>
        </Link>
    )
}
