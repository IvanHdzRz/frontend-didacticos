import { useState, useEffect, useRef } from 'react';

const  headers = new Headers();
headers.append("Content-Type", "application/json");

const defaultOptions={
    method: 'GET',
    headers: headers,
    redirect: 'follow'
};


export const useFetch = ( url,options=defaultOptions) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect( () => {
        isMounted.current=true
        return () => {
            isMounted.current = false;
        }
    }, [])


    useEffect( () => {

        setState({ data: null, loading: true, error: null });
        const fetchData=async()=>{
            try{
                const req=await fetch(url,options)
                const statusCode=req.status;
                const data=await req.json();
                if(isMounted.current){
                    setState({
                        loading: false,
                        error: null,
                        data,
                        statusCode: statusCode
                    });
                }
            }catch(e){
                if(isMounted.current){
                    setState({
                        data: null,
                        loading: false,
                        error: e,
                        statusCode:null
                    })
                }
            }
            
        }

        url!==null&&fetchData();

        /* if(url!==null){
            fetch( url,options )
            .then( resp => resp.json() )
            .then( data => {

                if ( isMounted.current ) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }

            })
            .catch( (e) => {
                setState({
                    data: null,
                    loading: false,
                    error: e
                })
            })

        } */

        
    },[url])

    return state;
}