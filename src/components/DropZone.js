import React,{useCallback} from 'react'
import {useDropzone} from 'react-dropzone' 
import { Label } from './Label'
import PdfIcon from '../assets/icons/pdf.png'
import * as _ from 'lodash'

export const DropZone = ({onSelectFile,onFileError, onTouchDropzone,fileName}) => {
    const debounceSetTouch=_.debounce(function(){
        console.log('soy unbounce')
        onTouchDropzone(fileName,true)
    },1000,{leading:true,trailing:false})
    
    const onDrop= useCallback((acceptedFiles,fileRejections)=>{
       console.log('soy ondrop')
        debounceSetTouch()
        
        if(fileRejections.length>0){
            onFileError(fileName,'debe ser un archivo PDF')
            console.log('la cagaste')
        }
        if(acceptedFiles.length>0){
            onSelectFile(fileName,acceptedFiles[0])
            console.log(acceptedFiles[0])
        }

    },[fileName,onSelectFile,onFileError,debounceSetTouch])
    
        
    
    const config={
        onDrop:onDrop, //callback when a file is selected 
        accept:'application/pdf', //tipe files accepted
        maxFiles:1,
        multiple:false, //disable multiple seleccion of files
        onDragEnter:debounceSetTouch,
        onFileDialogCancel:()=>{
            debounceSetTouch()
            onFileError(fileName,'debes escoger un documento')
        }
    }
    const {getInputProps,getRootProps,isDragActive}=useDropzone(config)
    /* if(isDragActive){
        debounceSetTouch()
    } */

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
