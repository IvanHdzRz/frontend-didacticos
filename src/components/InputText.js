import React from 'react'

import {Label} from './Label'
import { WarningLabel } from './WarningLabel'

export const InputText = ({name,label, error,errorMessage}) => {
    return (
        <div className="m-2">
            <Label forName={name} label={label} />
            <input
                id={name}
                name={name} 
                type="text"
                className={`
                    h-10  px-2 w-full mt-2 mb-1
                    text-xl
                    border-solid border-2 border-pink-500 rounded outline-none 
                    focus:ring focus:ring-red-500 focus:ring-opacity-50 
                `}
            />
            {
                
                error&&<WarningLabel forName={name} warnMessage={errorMessage} />
            }
         </div>
    )
}
