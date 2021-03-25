import * as yup from 'yup'

export const schemaDidactico = yup.object().shape({
    numero:yup
        .number("debe ser numero")
        .min(0)
        .integer()
        .required('es a la de ahuevo padre'),
})

