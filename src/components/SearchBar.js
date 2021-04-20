import React from 'react'
import searchIcon from '../assets/icons/loupe.png'

export const SearchBar = () => {
    return (
        <div className="flex ">
            <input
                placeholder="Busqueda"  
                type="text" 
                className="h-10  px-2 w-full  text-xl border-solid border-2 border-pink-300 rounded-l outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
            />
            <button className="bg-pink-600 p-2 h-10 w-10 flex justify-center items-center rounded-r">
                <img src={searchIcon} className="h-4 w-4" alt="loupe" />
            </button>  
        </div>
    )
}
