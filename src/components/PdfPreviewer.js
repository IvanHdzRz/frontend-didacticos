import React, { useEffect, useLayoutEffect, useState } from 'react'



export const PdfPreviewer = ({src}) => {
    const [fetchPdf, setfetchPdf] = useState(true)
    const [pdfPages, setpdfPages] = useState(0)
    
    useEffect(async () => {
        const pdf=await pdfjsLib.getDocument(src)
        setpdfPages(pdf.numPages)
        setfetchPdf(false)
    }, [])

    useLayoutEffect(() => {
        
    }, [])

    
    return( 
        <div >
            {
                fetchPdf? <h1>cargando</h1>: <h1>tu pdf tiene {pdfPages} paginas</h1>
            }
        </div>
    )
}
