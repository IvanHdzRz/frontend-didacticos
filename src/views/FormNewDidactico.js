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
import {apiUrl} from '../env/apiurl'

/*TODO 
    DISABLED all inputs while is Submittig

*/

export const FormNewDidactico = () => {
    const formInitialValue={numero:'',tipo:'',titulo:'',existencias:0,pdf:null,img:null}
    const handleSubmit=(values, {setSubmitting,resetForm}) =>{
        const {existencias,numero,tipo,titulo:nombre,pdf,img}=values
        const didactico={existencias,numero,tipo,nombre,tags:['ejemplo','prueba 1']}
        const formData=new FormData();
        
        formData.append("didactico",JSON.stringify(didactico))
        formData.append("pdf",pdf,"didactico_pdf.pdf")
        formData.append("img",img,"didactico_img.png")
        console.log(img)
        const options={
            method:'POST',
            redirect:'follow',
            body:formData
        }

        fetch(`${apiUrl}/didacticos`,options)
            .then(res=>res.text())
            .then(result=>{
                console.log(result)
                setSubmitting(false)
                resetForm();
            })
            .catch(e=>{
                console.log(e)
            })
            
    }

    return (
        <div className="bg-gray-100 min-h-screen pb-8">
            <SeccionTitle title="Agregar nuevo didactico"/>
            <Formik initialValues={formInitialValue} onSubmit={handleSubmit} validationSchema= {schemaDidactico} >
                {({errors,touched,setFieldValue,setFieldError,setFieldTouched,values,isSubmitting})=>(
                    <Form className="mt-8  w-11/12	mx-auto rounded-lg px-4 py-8 grid grid-cols-2 gap-x-4 gap-y-6 bg-white">
                        
                        <Field name="numero" component={InputText} label="Numero" disabled={isSubmitting}/>
                        <Field 
                            name="tipo"
                            label="tipo"
                            component={Select}
                            options={[
                                {name:'Selecciona',value:''},
                                {name:'monografia',value:'mngf'},
                                {name:'biografia',value:'bgrf'},
                            ]} 
                            disabled={isSubmitting}
                        /> 
                        <div className='col-span-2'>
                            <Field name="titulo" component={InputText} label="titulo" disabled={isSubmitting}/>
                        </div>
                        <Field  name="existencias" component={InputText} label="existencias" disabled={isSubmitting}/> 
                        
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
                            <SubmitButton isSubmiting={isSubmitting} />
                        </div>
                    </Form>
                )}
            </Formik>
            
        </div>
    )
}
