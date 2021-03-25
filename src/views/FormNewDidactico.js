import React from 'react'
import {InputText} from '../components/InputText'
import {SeccionTitle} from '../components/SeccionTitle'
import {Formik,Form,Field} from 'formik'
import { Label } from '../components/Label'

export const FormNewDidactico = () => {
    return (
        <div className="bg-gray-200 min-h-screen">
            <SeccionTitle title="Agregar nuevo didactico"/>
            <Formik
                initialValues={
                    {numero:'',tipo:'',nombre:''}
                }
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                    }, 1000);
                }}

            >
                {({handleChange,handleBlur})=>(
                    <Form className="mt-8 px-2 grid grid-cols-2">
                        <div className={``}>
                            <Label forName="numero" label="Numero" />
                            <Field name="numero" component={InputText}/>
                        </div>
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}
