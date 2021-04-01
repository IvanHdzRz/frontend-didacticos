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
    const [counter,prevPage,nextPage,,setPages]=useCounter({min:1,max:1,initial:1})   
    const {count:currentPage}=counter
    /*flag*/
    const isRendering=useRef(false)
    /*DOM references*/
    const container = useRef(null)
    const canvasRef=useRef()
    /*store number of compenet renders*/
    const renderizados = useRef(0)
    
    

    /* const getPdf =async(file) =>{
        const buffer=await fileToBufferArray(file)
        const pdf= await pdfjsLib.getDocument(buffer).promise
        const {numPages}=pdf
        setpdfDoc(pdf)
        setPages(numPages)
    } */

   //al cargar por primera vez el componente cargara el pdf
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

    //despues del primer renderizado obtendra el ancho de su container
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
            const scale=Math.min(containerSize.height/viewport.height,containerSize.width/viewport.width)
            const scaledViewport=docPage.getViewport({scale:scale})
            //prepating canvas 
            const context=canvasRef.current.getContext('2d')
            canvasRef.current.height = scaledViewport.height;
            canvasRef.current.width = scaledViewport.width;
            //rendering page 
            const renderContext = {canvasContext: context,viewport: scaledViewport}
            await docPage.render(renderContext).promise
            isRendering.current=false
        }
        //si ya cargo el pdf y no hay una tarea de renderizado activa
        //entonces renderiza
        pdfDoc&&!isRendering.current&&renderPage()
   },[currentPage,pdfDoc])
    
    
    
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
                    <Button onClick={()=>{alert('uwu')}}>
                        <img src={rotateIcon} alt="rotate icon" className="w-6" /> 
                    </Button>
                    
                </div>
            }
        </div>
    )
}
