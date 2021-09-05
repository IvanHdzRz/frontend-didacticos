import React, { useContext, useState } from 'react'
import {InputText} from '../components/InputText'
import {SeccionTitle} from '../components/SeccionTitle'
import {Formik,Form,Field} from 'formik'
import {schemaDidactico} from '../helper/validationSchemas/schemaDidactico'
import { Select } from '../components/Select'
import {DropZone} from '../components/DropZone'
import { WarningLabel } from '../components/WarningLabel'
import { SubmitButton } from '../components/SubmitButton'
import { PdfPreviewer } from '../components/PdfPreviewer'
import { Label } from '../components/Label'
import {apiUrl} from '../env/apiurl'
import { TagContainer } from '../components/TagContainer'
import { useFetch } from '../hooks/useFetch'
import { LoadingSpinner } from '../components/LoadingSpinner'
import {initialFormDidacticoValues} from '../reducers/appReducer'
import { InformationScreen } from '../components/InformationScreen'
import { Modal } from '../components/Modal'
import { getAuthHeader } from '../helper/getAuthHeader'
import AppContext from '../context/appContext'
import { ErrorScreen } from '../components/ErrorScreen'

export const FormNewDidactico = ({edit=false,initialValues=initialFormDidacticoValues}) => {
    const [modalIsShowing, setmodalIsShowing] = useState(false)
    const [modalMessage, setmodalMessage] = useState("")
    const {state}= useContext(AppContext)
    const {authToken}=state
    const formInitialValue=initialValues
    const fetchOptions={
        method: 'GET',
        headers: getAuthHeader({authToken}),
        redirect: 'follow'
    }
    const {data:options,loading,error,statusCode,refresh}=useFetch(`${apiUrl}/tipos`,fetchOptions)
    
    const handleSubmit=(values, {setSubmitting,resetForm}) =>{
        const {existencias,numero,tipo,titulo:nombre,pdf,img,tags}=values
        const didactico={
            existencias,
            numero,
            tipo,
            nombre,
            tags: tags
                .trim()
                .split(' ')
                .filter(tag=>tag!==' '&&tag!=='')
        }
        const formData=new FormData();
        
        formData.append("didactico",JSON.stringify(didactico))
        formData.append("pdf",pdf,"didactico_pdf.pdf")
        formData.append("img",img,"didactico_img.png")
        console.log(img)
        const options={
            method:edit?'PUT':'POST',
            redirect:'follow',
            headers:getAuthHeader({authToken}),
            body:formData
        }
        console.log(didactico)
        fetch(`${apiUrl}/didacticos`,options)
            .then(res=>res.text())
            .then(result=>{
                console.log(result)
                setSubmitting(false)
                resetForm();
            })
            .catch(e=>{
                console.log(e)
                setSubmitting(false)
                setmodalMessage("Error Cao")
                setmodalIsShowing(true)
            })
            
    }

    return (
        <div className="bg-gray-100 min-h-screen pb-8">
            <SeccionTitle title={edit?"Editar Didactico":"Agregar nuevo didactico"}/>
            {loading?
                <LoadingSpinner/>:
                error||statusCode!==200?
                    <div className="w-full min-h-screen flex justify-center items-center">
                        <ErrorScreen error={error} statusCode={statusCode} onRetry={refresh}/>
                    </div>
                    :
                    <Formik initialValues={formInitialValue} onSubmit={handleSubmit} validationSchema= {schemaDidactico} >
                        {({errors,touched,setFieldValue,setFieldError,setFieldTouched,values,isSubmitting})=>(
                            <Form className="mt-8  w-11/12	mx-auto rounded-lg px-4 py-8 grid grid-cols-2 gap-x-4 gap-y-6 bg-white">
                                
                                <Field name="numero" component={InputText} label="Numero" disabled={isSubmitting||edit}/>
                                <Field 
                                    name="tipo"
                                    label="tipo"
                                    component={Select}
                                    options={
                                        options.map(({id,nombre})=>{
                                            return {name:nombre,value:id}
                                        })
                                    } 
                                    disabled={isSubmitting || edit}
                                /> 
                                <div className='col-span-2'>
                                    <Field name="titulo" component={InputText} label="titulo" disabled={isSubmitting}/>
                                </div>
                                <Field  name="existencias" component={InputText} label="existencias" disabled={isSubmitting}/> 
                                {console.log(values)}
                                {
                                    values.pdf?
                                        <div className="col-span-2">
                                            <Label forName="preview" label="Selecciona una vista previa"/>
                                            <PdfPreviewer file={values.pdf} fileName="pdf" blobName="img" setFieldValue={setFieldValue} disabled={isSubmitting}/>
                                            {
                                                errors.img && touched.img &&
                                                <WarningLabel forName="pdf" warnMessage={errors.img} />
                                            }
                                        </div>
                                        :
                                        <div className="col-span-2">
                                            <DropZone 
                                                onSelectFile={setFieldValue} 
                                                onFileError={setFieldError}
                                                onTouchDropzone={setFieldTouched} 
                                                fileName="pdf"
                                            />
                                            {
                                                errors.pdf && touched.pdf &&
                                                <WarningLabel forName="pdf" warnMessage={errors.pdf} />
                                            }
                                        </div>
                                }
                                <div className="col-span-2">
                                    <Field  name="tags" component={TagContainer} label="Tags" disabled={isSubmitting}/>
                                </div>

                                <div className="col-span-2">
                                    <SubmitButton isSubmiting={isSubmitting} text="guardar" onSubmitText="guardando" />
                                </div>
                            </Form>
                        )}
                    </Formik>
                    
            }
            {

                modalIsShowing && 
                    <Modal close={()=>{setmodalIsShowing(false)}}>
                        <InformationScreen />
                    </Modal>
            }

            
        </div>
    )
}
