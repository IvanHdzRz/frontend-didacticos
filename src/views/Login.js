import { Field, Form, Formik } from 'formik'
import React from 'react'
import { InputText } from '../components/InputText'
import { SeccionTitle } from '../components/SeccionTitle'
import { SubmitButton } from '../components/SubmitButton'
import { schemaLogin } from '../helper/validationSchemas/schemaLogin'

export const Login = () => {
    const initialValues={
        username:"",
        password:""
    }
    
    const handleSubmit=(values)=>{
        
        console.log('me envian')
    }
    
    return (
        <div className="bg-gray-100 min-h-screen pb-8 flex flex-col justify-center">
            <SeccionTitle title="Login"/>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schemaLogin}>
                {({isSubmitting})=>(
                    <Form className="mt-8  w-11/12	mx-auto rounded-lg px-4 py-8 flex flex-col bg-white space-y-2">
                        <Field name="username" component={InputText} label="Usuario"  />
                        <Field name="password" component={InputText} label="Contraseña" isPassword  />
                        <SubmitButton text="Ingresar" onSubmitText="Ingresando" isSubmiting={isSubmitting}/>
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}
