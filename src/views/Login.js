import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { InputText } from '../components/InputText'
import { SeccionTitle } from '../components/SeccionTitle'
import { SubmitButton } from '../components/SubmitButton'
import { WarningLabel } from '../components/WarningLabel'
import { apiUrl } from '../env/apiurl'
import { schemaLogin } from '../helper/validationSchemas/schemaLogin'

export const Login = () => {
    const [errorToLogin, setErrorToLogin] = useState({error:false,message:""});
    const {error,message}=errorToLogin
    const initialValues={
        username:"",
        password:""
    }
    
    const handleSubmit=async(values)=>{
        
        try{

            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(values) // body data type must match "Content-Type" header
            });
            response.status===403&&setErrorToLogin({error:true,message:"Usuario y/o contraseña incorrecto"})
            response.status===503&&setErrorToLogin({error:true,message:"Oops, tenemos un problema, intentalo mas tarde"})
            
            
        }catch(e){
            setErrorToLogin({error:true,message:"Oops, tenemos un problema, intentalo mas tarde"})
            console.log(e)
        }
          
    }
    
    return (
        <div className="bg-gray-100 min-h-screen pb-8 flex flex-col justify-center">
            <SeccionTitle title="Login"/>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schemaLogin}>
                {({isSubmitting})=>(
                    <Form className="mt-8  w-11/12	mx-auto rounded-lg px-4 py-8 flex flex-col bg-white space-y-6">
                        {error&&<WarningLabel forName="" warnMessage={message} /> }
                        <Field name="username" component={InputText} label="Usuario"  />
                        <Field name="password" component={InputText} label="Contraseña" isPassword  />
                        <SubmitButton text="Ingresar" onSubmitText="Ingresando" isSubmiting={isSubmitting}/>
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}
