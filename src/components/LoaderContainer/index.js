import React from 'react'
import styles from  './loader.module.css'

const LoaderContainer = ({ children, loading, width, height, ...props }) => {
    if (loading) {
        return <div className='flex items-center justify-center w-ful' style={{ width : width ||'100%', height : height || '100px'}}>
            <div id="loader-wrapper"> 
                  <div id="loader"></div>
                </div>
        </div>
    }
    return children;
}

export default LoaderContainer