import * as yup from 'yup'

export const schemaLogin = yup.object().shape({
    username: yup
        .string()
        .trim()    
        .required('olvidaste poner un nombre de usuario'),
    password: yup
        .string()
        .trim()    
        .required('olvidaste escribir tu contraseña'),

})