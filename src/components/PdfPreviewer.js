import React, {useEffect,  useLayoutEffect,  useRef,  useState } from 'react'
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
    const [fetchPdf, setfetchPdf] = useState(true)
    const [pdfDoc, setpdfDoc] = useState(null)
    const [containerSize, setcontainerSize] = useState({height:0,width:0})
    const [counter,prevPage,nextPage,,setPages]=useCounter({min:1,max:1,initial:1})   
    /*DOM references*/
    const container = useRef(null)
    const canvasRef=useRef(null)
    const {count:currentPage}=counter
    
    const getPdf =async(file) =>{
        const buffer=await fileToBufferArray(file)
        const pdf= await pdfjsLib.getDocument(buffer).promise
        const {numPages}=pdf
        setPages(numPages)
        setfetchPdf(false)
        setpdfDoc(pdf)
    }
    
    
    const renderPage=async(currentPage)=>{
        const  docPage= await pdfDoc.getPage(currentPage)
        const originalScale=1
        const viewport=docPage.getViewport({scale:originalScale})
        const scale=Math.min(containerSize.height/viewport.height,containerSize.width/viewport.width)
        const scaledViewport=docPage.getViewport({scale:scale})
        const context=canvasRef.current.getContext('2d')
        canvasRef.current.height = scaledViewport.height;
        canvasRef.current.width = scaledViewport.width;
        const renderContext = {canvasContext: context,viewport: scaledViewport}
        docPage.render(renderContext);
    }
    //al cargar por primera vez el componente cargara el pdf
    useEffect(() => {
        getPdf(file);
    },[file])
    //despues del primer renderizado obtendra el ancho de su container
    useLayoutEffect(() => {
        setcontainerSize({
            height:container.current.offsetHeight,
            width:container.current.offsetWidth
        }) 
    },[currentPage])
    //cada vez que se cambie de pagina, renderiza de nuevo el pdf
    //en la pagina solicitada
    useEffect(() => {
        if(fetchPdf===false){
            renderPage(currentPage)
        }
    },[currentPage,fetchPdf])
  
    
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
                    fetchPdf? <h1>cargando</h1>: <canvas ref={canvasRef} />
                            
                }
            </div>
            {
                !fetchPdf&&
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
                    <button onClick={prevPage}>

                    </button>
                </div>
            }
        </div>
    )
}
