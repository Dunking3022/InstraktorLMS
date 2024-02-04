import React from 'react'
import { useEffect } from "react";

const Documentation = () => {
    useEffect(() => {
        window.open("https://instraktor.gitbook.io/instraktor-fms/", '_self');
      }, []);
  return (
    <div>
        
    </div>
  )
}

export default Documentation