import React,{useCallback} from 'react'
import {useDropzone} from 'react-dropzone' 
import { Label } from './Label'
import PdfIcon from '../assets/icons/pdf.png'

export const DropZone = () => {
    const onDrop= useCallback(acceptedFiles=>{
        alert(acceptedFiles)
    },[])
    const {getInputProps,getRootProps,isDragActive}=useDropzone({onDrop})

    return (
        <div className={`w-full `}>
            <Label label="Pdf" forName="pdf" />
            <div 
                {...getRootProps()} 
                className={`
                    border-4 border-dashed outline-none border-pink-300 rounded-xl 
                    flex justify-center items-center h-40 mb-4
                    bg-pink-50
                `} 
            >
                <input 
                    {...getInputProps()}
                    className={`hidden`}
                    
                />
            
            {
                isDragActive?
                <p>Arrastra aqui ...</p> :
                <div className="flex flex-col justify-center items-center space-y-4">
                    <img src={PdfIcon} alt="pdf-icon" className={`w-14`} />
                    <p className={`px-4 py-2 mx-4 bg-white rounded border-pink-400 border-2 text-center font-bold text-pink-400 text-xs`}>
                        Arrastra un archivo aqui, o da click y selecciona uno
                    </p>
                </div>
            }
            </div>
        </div>
    )
}
