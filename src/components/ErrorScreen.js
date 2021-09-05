import React from 'react'
import { ErrorConnection } from './ErrorConnection'
import { ErrorNoPermission } from './ErrorNoPermission'
import { ErrorServer } from './ErrorServer'
import { InformationScreen } from './InformationScreen'

export const ErrorScreen = ({error=true, statusCode,onRetry=undefined}) => {
    return (
        <>
            {
                error?
                    <ErrorConnection onRetry={onRetry===undefined?undefined:onRetry} />:
                        statusCode>=400&&statusCode<500?
                            <ErrorNoPermission />:
                                statusCode>=500&&statusCode<600?
                                    <ErrorServer onRetry={onRetry===undefined?undefined:onRetry} />:
                                    <InformationScreen />
            }   
        </>
    )
}
