//import React from 'react'
import CompoC from './CompoC'

export default function CompoB({dataProp}:any) {
  return (
    <div>
        <h1>Component B</h1>
        <CompoC dataProp={dataProp}/>
    </div>
  )
}
