import React from 'react'
import {SeccionTitle} from '../components/SeccionTitle'
import {SearchBar} from '../components/SearchBar'
export const SearchDidactico = () => {
    return (
        <div className="bg-gray-100 min-h-screen pb-8">
            <SeccionTitle title="Materiales Didacticos"/>
            <form className="p-2">
                <SearchBar />
                <div id="refiners">

                </div>
            </form>
            <div id="resultsContainer" className="p-4">

            </div>
        </div>
    )
}
