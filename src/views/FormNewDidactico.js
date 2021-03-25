import React from 'react'
import {InputText} from '../components/InputText'
import {SeccionTitle} from '../components/SeccionTitle'
import {Formik,Form,Field} from 'formik'
import {schemaDidactico} from '../helper/validationSchemas/schemaDidactico'
import { Select } from '../components/Select'


export const FormNewDidactico = () => {
    const formInitialValue={numero:'',tipo:'',nombre:'',existencias:0}
    const handleSubmit=(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <SeccionTitle title="Agregar nuevo didactico"/>
            <Formik initialValues={formInitialValue} onSubmit={handleSubmit} validationSchema= {schemaDidactico} >
                {()=>(
                    <Form className="mt-8 px-2 grid grid-cols-2 gap-x-4 gap-y-6">
                        <Field name="numero" component={InputText} label="Numero"/>
                        <Field 
                            name="tipo"
                            label="tipo"
                            component={Select}
                            options={[
                                {name:'monografia',value:'mngf'},
                                {name:'biografia',value:'bgrf'},
                            ]} 
                        /> 
                        <div className='col-span-2'>
                            <Field name="titulo" component={InputText} label="titulo" />
                        </div>
                        <Field  name="existencias" component={InputText} label="existencias"/> 
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}
