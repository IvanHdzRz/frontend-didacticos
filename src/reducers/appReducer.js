import TYPES from '../types/appActions'
export const initialFormDidacticoValues={
    numero:'',tipo:'',titulo:'',existencias:0,pdf:null,img:null,tags:''    
}

export const initialState={
    lastSearch:null,
    searchIndex:null,
    authToken:null,
    userName:null,
    userPermissions:null,
}

export const appReducer = (prevState={},action) => {
    switch(action.type){
        case TYPES.SET_AUTH_DATA:
            const {userName,userPermissions,authToken}=action.payload
            return {
                ...prevState,
                userName,
                userPermissions,
                authToken
            }

        default: return {prevState}  
    }
    
}
