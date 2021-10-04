import {  Field, Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import TYPES from '../types/appActions'
import { InputText } from '../components/InputText'
import { SeccionTitle } from '../components/SeccionTitle'
import { SubmitButton } from '../components/SubmitButton'
import { WarningLabel } from '../components/WarningLabel'
import AppContext from '../context/appContext'
import { apiUrl } from '../env/apiurl'
import { schemaLogin } from '../helper/validationSchemas/schemaLogin'
import jwt from 'jsonwebtoken'
import { Modal } from '../components/Modal'
import { ErrorConnection } from '../components/ErrorConnection'
import { useModal } from '../hooks/useModal'

export const Login = () => {
    const{dispatch}= useContext(AppContext)
    
    const [errorToLogin, setErrorToLogin] = useState({error:false,message:""});
    const {error,message}=errorToLogin
    
    const [isVisible,openModal,closeModal]=useModal({visible:false})

    const initialValues={
        username:"",
        password:""
    }
    
    const handleSubmit=async(values)=>{
        
        try{

            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(values) // body data type must match "Content-Type" header
            });
            response.status===403||response.status===401&&setErrorToLogin({error:true,message:"Usuario y/o contraseña incorrecto"})
            response.status===503&&setErrorToLogin({error:true,message:"Oops, tenemos un problema, intentalo mas tarde"})
            const {token}=await response.json();
            if(response.status===201){
                const decode= jwt.decode(token)
                
                dispatch({
                    type:TYPES.SET_AUTH_DATA,
                    payload:{
                        authToken:token,
                        userName:decode.userName,
                        userPermissions:decode.userPermissions
                    }
                })
            }
            
        }catch(e){
            setErrorToLogin({error:true,message:"Oops, tenemos un problema, intentalo mas tarde"})
            openModal();
        }
          
    }
    
    return (
        <div className="bg-gray-100 min-h-screen pb-8 flex flex-col justify-center">
            <SeccionTitle title="Login"/>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={schemaLogin}>
                {({isSubmitting,submitForm})=>(
                    <>
                        <Form className="mt-8  w-11/12	mx-auto rounded-lg px-4 py-8 flex flex-col bg-white space-y-6">
                            {error&&<WarningLabel forName="" warnMessage={message} /> }
                            <Field name="username" component={InputText} label="Usuario" disabled={isSubmitting}  />
                            <Field name="password" component={InputText} label="Contraseña" isPassword disabled={isSubmitting}  />
                            <SubmitButton text="Ingresar" onSubmitText="Ingresando" isSubmiting={isSubmitting}/>
                        </Form>
                        {
                        isVisible&&
                            <Modal close={closeModal}>
                                <ErrorConnection onRetry={submitForm}/>
                            </Modal>
                        }
                    </>
                )}
            </Formik>
        </div>
    )
}
