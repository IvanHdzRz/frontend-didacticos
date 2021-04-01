import { useState } from 'react'

export const useCounter = ({initial,max,min}) => {
    //inicializa el contador con sus valores maximo,minimo y el conteo inicial
    //si el valor inicial dado esta fuera de los limites dados, min y max, coloca min
    const [counter, setcounter] = useState({max,min,count:initial>=min&&initial<=max?initial:min})
    
    const onNext=()=>{
        setcounter(({max,min,count})=>{ 
            const newCount=count+1<=max?count+1:min
            return {max,min,count:newCount}
        })
    }
    const onPrev=()=>{
        setcounter(({max,min,count})=>{ 
            const newCount=count-1>=min?count-1:max
            return {max,min,count:newCount}
        })
    }
    const onReset=()=>{
        setcounter(({max,min})=>{ 
            return {max,min,count:initial>=min&&initial<=max?initial:min}
        })
    }
    const setMax=(max)=>{
        setcounter(prevState=>({...prevState,max:max}))
    }
    const setMin=(min)=>{
        setcounter(prevState=>({...prevState,min:min}))
    }

    return [counter,onPrev,onNext,onReset,setMax,setMin]
    
}
