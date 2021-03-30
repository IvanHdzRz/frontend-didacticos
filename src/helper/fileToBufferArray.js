export const fileToBufferArray=(file)=>{
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