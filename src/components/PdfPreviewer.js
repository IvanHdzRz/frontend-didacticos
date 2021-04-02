import React, {useEffect,  useRef,  useState } from 'react'
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { fileToBufferArray } from '../helper/fileToBufferArray';
import { useCounter } from '../hooks/useCounter';
import arrowIcon from '../assets/icons/right-arrow.png'
import rotateIcon from '../assets/icons/rotate.png'
/* import closeIcon from '../assets/icons/close.png' */
import { Button } from './Button';





export const PdfPreviewer = ({file,name}) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    /*states*/
    const [pdfDoc, setpdfDoc] = useState(null)
    //change page of document to render
    const [counter,prevPage,nextPage,,setPages]=useCounter({min:1,max:1,initial:1}) 
    //change orientacion of page
    const[rotate,,nextRotation]=useCounter({min:0,max:3,initial:0})  
    const {count:currentPage}=counter
    const {count:currentRotation}=rotate
    /*flag to trigger render only when ends other render*/
    const isRendering=useRef(false)
    /*DOM references to fit pdf size in container*/
    const container = useRef(null)
    const canvasRef=useRef()
    /*store number of compenent renders*/
    const renderizados = useRef(0)

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
            //getting size of current container
            const {width,height}=container.current.getBoundingClientRect()   
            const containerSize={width,height}
            //getting page for render
            const  docPage= await pdfDoc.getPage(currentPage)
            //re-scale page to fit in current container
            const originalScale=1
            const viewport=docPage.getViewport({scale:originalScale})
            //scale depends if rotations is landscape or vertical
            const scale=currentRotation%2?
                Math.min(containerSize.width/viewport.height,containerSize.height/viewport.width):    
                Math.min(containerSize.height/viewport.height,containerSize.width/viewport.width)
            const scaledViewport=docPage.getViewport({scale:scale,rotation:currentRotation*90})
            //prepating canvas 
            const context=canvasRef.current.getContext('2d')
            canvasRef.current.height = scaledViewport.height;
            canvasRef.current.width = scaledViewport.width;
            //rendering page 
            const renderContext = {canvasContext: context,viewport: scaledViewport}
            await docPage.render(renderContext).promise
            isRendering.current=false
        }
        //if pdf is ready and other renders task has ended, then render
        pdfDoc&&!isRendering.current&&renderPage()
   },[currentPage,pdfDoc,currentRotation])
    
    
    console.log(renderizados.current)
    renderizados.current=renderizados.current+1
    
    return( 
        <div className="w-full">
            <div  
                ref={container} 
                name={name} 
                className={`
                    border-4 border-dashed outline-none border-pink-300 rounded-xl 
                    flex justify-center items-center h-60 mb-4
                    bg-pink-50
                `}
            >
                {
                    !pdfDoc? <h1>cargando</h1>: <canvas ref={canvasRef} />
                            
                }
            </div>
            {
                pdfDoc&&
                <div className="space-x-4 flex-row">
                    <Button onClick={prevPage}>
                        <img src={arrowIcon} alt="prev icon" className="w-6 transform rotate-180" /> 
                    </Button>
                    <Button onClick={nextPage}>
                        <img src={arrowIcon} alt="next icon" className="w-6" /> 
                    </Button>
                    <Button onClick={nextRotation}>
                        <img src={rotateIcon} alt="rotate icon" className="w-6" /> 
                    </Button>
                    
                </div>
            }
        </div>
    )
}
