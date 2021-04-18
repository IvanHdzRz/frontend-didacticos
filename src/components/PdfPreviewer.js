import React, {useEffect,  useRef,  useState } from 'react'
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { fileToBufferArray } from '../helper/fileToBufferArray';
import { useCounter } from '../hooks/useCounter';
import arrowIcon from '../assets/icons/right-arrow.png'
import rotateIcon from '../assets/icons/rotate.png'
import closeIcon from '../assets/icons/close.png'
import { Button } from './Button';





export const PdfPreviewer = ({file,fileName,blobName,setFieldValue,disabled}) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    /*states*/
    const [pdfDoc, setpdfDoc] = useState(null)
    //change page of document to render
    const [counter,prevPage,nextPage,,setPages]=useCounter({min:1,max:1,initial:1}) 
    //change orientacion of page
    const[rotate,,nextRotation]=useCounter({min:0,max:3,initial:0})  
    const [imgUrl, setimgUrl] = useState(null)
    
    const {count:currentPage}=counter
    const {count:currentRotation}=rotate
    
    
    /*flag to trigger render only when ends other render*/
    const isRendering=useRef(false)
    /*DOM references to fit pdf size in container*/
    const container = useRef(null)
    const canvasRef=useRef()
    /*store number of compenent renders*/
    const renderizados = useRef(0)
    

    const handleClosePreview=()=>{
        //set a the value of pdf file to null, this will close preview
        //and user can choose other file in case he select a incorrect
        setFieldValue(fileName,null)
        setFieldValue(blobName,null)
    }
    const handleConvertCanvasToBlob=()=>{
        canvasRef.current.toBlob(blob=>{
            setFieldValue(blobName,blob)
        })
    }

   //in first render will load pdf
    useEffect(() => {
        const getPdf =async(file) =>{
            const buffer=await fileToBufferArray(file)
            const pdf= await pdfjsLib.getDocument(buffer).promise
            const {numPages}=pdf
            setpdfDoc(pdf)
            setPages(numPages)
        }
        getPdf(file);
    },[file])

    //when chenges pdf, page or orientation will trigger a render 
   useEffect(() => {
        const renderPage=async()=>{
            isRendering.current=true
            const  docPage= await pdfDoc.getPage(currentPage)
            const originalScale=1
            const viewport=docPage.getViewport({scale:originalScale,rotation:currentRotation*90})
            const context=canvasRef.current.getContext('2d')
            canvasRef.current.height =viewport.height;
            canvasRef.current.width = viewport.width;
            //rendering page 
            const renderContext = {canvasContext: context,viewport: viewport}
            await docPage.render(renderContext).promise
            const imgUrl=canvasRef.current.toDataURL();
            setimgUrl(imgUrl)
            isRendering.current=false
        }
        //if pdf is ready and other renders task has ended, then render
        pdfDoc&&!isRendering.current&&renderPage()
   },[currentPage,pdfDoc,currentRotation])
    
    
    console.log(renderizados.current)
    renderizados.current=renderizados.current+1
    
    return( 
        <div className="w-full ">
            <div  
                ref={container} 
                name={fileName} 
                className={`border-4 border-dashed outline-none border-pink-300 rounded-xl flex justify-center items-center h-60 mb-4 bg-pink-50 relative`}
            >
                {
                    !pdfDoc? 
                        <h1>cargando</h1>: 
                        <div className="h-full w-full">
                            <canvas ref={canvasRef} className="hidden"/>
                            <img src={imgUrl} alt="preview" className="h-full w-full object-contain"/>
                            <div className="space-x-4 flex-row absolute bottom-0 right-0 left-0">
                                <Button onClick={prevPage} disabled={disabled}>
                                    <img src={arrowIcon} alt="prev icon" className="w-6 transform rotate-180" /> 
                                </Button>
                                <Button onClick={nextPage} disabled={disabled}>
                                    <img src={arrowIcon} alt="next icon" className="w-6" /> 
                                </Button>
                                <Button onClick={nextRotation} disabled={disabled}>
                                    <img src={rotateIcon} alt="rotate icon" className="w-6" /> 
                                </Button>
                                
                            </div>
                            <button onClick={handleClosePreview} className="absolute right-2 top-2" disabled={disabled}>
                                    <img src={closeIcon} alt="close icon" className="w-6" /> 
                            </button>
                        </div>
                            
                }
            </div>
            {
                pdfDoc&&
                    <div className="static">
                        <Button onClick={handleConvertCanvasToBlob} disabled={disabled} >
                            Elegir esta vista previa
                        </Button>
                    </div>
            }
        </div>
    )
}
