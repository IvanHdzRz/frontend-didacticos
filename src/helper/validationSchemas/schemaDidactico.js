import * as yup from 'yup'

export const schemaDidactico = yup.object().shape({
    numero:yup
        .number()
        .typeError('debe ser un numero')
        .min(0,'debe ser por lo menos cero')
        .integer('debe ser un numero entero')
        .required('este campo es requerido'),
})
