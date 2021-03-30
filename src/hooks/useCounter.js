import { useState } from 'react'

export const useCounter = ({initial,max,min}) => {
    const [count, setcount] = useState(initial)
    
    const onNext=()=>{
        setcount(prevCount=>{
            return prevCount<max?prevCount+1:min 
        })
    }
    const onPrev=()=>{
        setcount(prevCount=>{
            return prevCount>min?prevCount-1:max 
        })
    }
    const onReset=()=>{
        setcount(initial)
    }

    return [count,onPrev,onNext,onReset]
    
}
