import React from 'react'
import {InputText} from '../components/InputText'
import {SeccionTitle} from '../components/SeccionTitle'
import {Formik,Form,Field} from 'formik'


export const FormNewDidactico = () => {
    const formInitialValue={numero:''}
    const handleSubmit=(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <SeccionTitle title="Agregar nuevo didactico"/>
            <Formik initialValues={formInitialValue} onSubmit={handleSubmit} >
                {()=>(
                    <Form className="mt-8 px-2 grid grid-cols-2 gap-x-4">
                        <Field name="numero" component={InputText} label="Numero"/>
                        
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}
