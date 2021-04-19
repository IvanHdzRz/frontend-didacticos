import * as yup from 'yup'


export const schemaDidactico = yup.object().shape({
    numero:yup
        .number()
        .typeError('debe ser un numero')
        .min(0,'debe ser por lo menos cero')
        .integer('debe ser un numero entero')
        .required('este campo es requerido'),
    tipo: yup
        .string()
        .required('selecciona un tipo'),
    existencias: yup
        .number()
        .typeError('debe ser un numero')
        .min(0,'debe ser por lo menos cero')
        .integer('debe ser un numero entero')
        .required('este campo es requerido'),
    titulo: yup
        .string()
        .trim()    
        .required('debes especificar un titulo'),
    pdf: yup.mixed().required('debes escoger un documento'),
    img: yup.mixed().required('debes escoger una previsualizacion '),
    tags: yup
        .string()
        .trim()
        .required('debes colocar por lo menos un tag'),
})

