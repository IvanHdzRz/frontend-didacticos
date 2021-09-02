import TYPES from '../actions/appActions'
export const initialFormDidacticoValues={
    numero:'',tipo:'',titulo:'',existencias:0,pdf:null,img:null,tags:''    
}

export const initialState={
    lastSearch:null,
    searchIndex:null,
    authToken:null
}

export const appReducer = (prevState={},action) => {
    switch(action.type){
        case TYPES.SET_AUTH_TOKEN:
            return {
                ...prevState,
                authToken:action.payload
            }

        default: return {prevState}  
    }
    
}
