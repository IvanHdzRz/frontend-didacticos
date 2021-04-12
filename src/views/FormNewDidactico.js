import React from 'react'
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

export const FormNewDidactico = () => {
    const formInitialValue={numero:'',tipo:'',titulo:'',existencias:0,pdf:null,img:null}
    const handleSubmit=(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 5000);
    }

    return (
        <div className="bg-gray-100 min-h-screen pb-8">
            <SeccionTitle title="Agregar nuevo didactico"/>
            <Formik initialValues={formInitialValue} onSubmit={handleSubmit} validationSchema= {schemaDidactico} >
                {({errors,touched,setFieldValue,setFieldError,setFieldTouched,values,isSubmitting})=>(
                    <Form className="mt-8  w-11/12	mx-auto rounded-lg px-4 py-8 grid grid-cols-2 gap-x-4 gap-y-6 bg-white">
                        
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
                        
                        {
                            values.pdf?
                                <div className="col-span-2">
                                    <Label forName="preview" label="Selecciona una vista previa"/>
                                    <PdfPreviewer file={values.pdf} fileName="pdf" blobName="img" setFieldValue={setFieldValue}/>
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
                        <SubmitButton isSubmiting={isSubmitting} />
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}
