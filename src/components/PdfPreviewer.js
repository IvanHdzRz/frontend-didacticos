import React, { useEffect,  useLayoutEffect,  useRef,  useState } from 'react'
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { fileToBufferArray } from '../helper/fileToBufferArray';
import { useCounter } from '../hooks/useCounter';
import { Label } from './Label';



export const PdfPreviewer = ({file}) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    const [fetchPdf, setfetchPdf] = useState(true)
    const [pdfPages, setpdfPages] = useState(0)
    const [pdfDoc, setpdfDoc] = useState(null)
    const [containerSize, setcontainerSize] = useState({height:0,width:0})
    const [currentPage,prevPage,nextPage]=useCounter({min:1,max:pdfPages,initial:1})   
    const container = useRef(null)
    const canvasRef=useRef(null)

    const getPdf=async(file)=>{
        const buffer=await fileToBufferArray(file)
        const pdf= await pdfjsLib.getDocument(buffer).promise
    
        setpdfPages(pdf.numPages)
        setfetchPdf(false)
        setpdfDoc(pdf)
    }
    const renderPage=async(page,pdf)=>{
        const  docPage= await pdf.getPage(page)
        const originalScale=1
        const viewport=docPage.getViewport({scale:originalScale})
        const doctoRatio=viewport.width/viewport.height
        const anchoDeseado=containerSize.height *doctoRatio
        const scale=anchoDeseado/viewport.width
        const scaledViewport=docPage.getViewport({scale:scale})
        const context=canvasRef.current.getContext('2d')
        canvasRef.current.height = scaledViewport.height;
        canvasRef.current.width = scaledViewport.width;
        
        const renderContext = {
            canvasContext: context,
            viewport: scaledViewport
          };
          docPage.render(renderContext);
    }
    //al cargar por primera vez el componente cargara el pdf
    useEffect(() => {
        getPdf(file);
    }, [file])
    //despues del primer renderizado obtendra el ancho de su container
    useLayoutEffect(() => {
        setcontainerSize({
            height:container.current.offsetHeight,
            width:container.current.offsetWidth
        }) 
    }, [currentPage])
    useEffect(() => {
        if(pdfDoc){
            renderPage(currentPage,pdfDoc)
        }
        
    }, [currentPage, pdfDoc])
  
    
    return( 
        <div className="w-full">
        <Label forName="preview" label="Preview"/>
        <div ref={container} htmlFor="preview" className="w-full bg-black border-purple-500 border-2 h-80 mb-4 flex justify-center items-center" >
            {
                fetchPdf? <h1>cargando</h1>: 
                <canvas ref={canvasRef}  >
                </canvas>
            }
        </div>
        </div>
    )
}
