import React, { useEffect,  useState } from 'react'
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

const toArrayBuff=(file)=>{
    return new Promise((resolve,reject)=>{
        const reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload=()=>{
            resolve(reader.result)
            
        }
        reader.onerror=(e)=>{
            reject({message:'fail to covert file to buffer',error:e})
        }
    })
    
}

export const PdfPreviewer = ({file}) => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    const [fetchPdf, setfetchPdf] = useState(true)
    const [pdfPages, setpdfPages] = useState(0)
    
    useEffect(() => {
        const getPdf=async(file)=>{
            const buffer=await toArrayBuff(file)
            pdfjsLib.getDocument(buffer).promise.then(pdf=>{
                const pdfDoc=pdf;
                setpdfPages(pdfDoc.numPages)
                setfetchPdf(false)
            })
                
        }
       
        getPdf(file);
    }, [file])

  
    
    return( 
        <div >
            {
                fetchPdf? <h1>cargando</h1>: <h1>tu pdf tiene {pdfPages} paginas</h1>
            }
        </div>
    )
}
