import React from 'react'
import { WarningIcon } from './WarningIcon'


export const WarningLabel = ({forName,warnMessage}) => {
    return (
        <label htmlFor={forName} className="text-red-500  flex  ">
            <WarningIcon />
            {warnMessage}
        </label>
    )
}
