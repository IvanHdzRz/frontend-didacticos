import React, { useState } from 'react'

export const useModal = ({visible=false}) => {
    const [isVisible, setisVisible] = useState(visible)

    const onClose=()=>{
        setisVisible(false);
    }
    const onOpen=()=>{
        setisVisible(true);
    }
    return [isVisible,onOpen,onClose]
}
