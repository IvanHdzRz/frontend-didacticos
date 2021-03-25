import React from 'react'
import { WarningIcon } from './WarningIcon'


export const WarningLabel = ({forName,warnMessage}) => {
    return (
        <label htmlFor={forName} className="text-red-500 h-6 text-xs flex items-center">
            <WarningIcon />
            {warnMessage}
        </label>
    )
}
