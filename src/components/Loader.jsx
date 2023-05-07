import React from 'react'
import '../styles/Loader.css'
import loadingGIF from '../assets/loading.gif'

function Loader() {
  return (
    <div className='loader'>
        <img src={loadingGIF} alt="Loader" />
    </div>
  )
}

export default Loader;