//import React from 'react'
import CompoD from './CompoD'

export default function CompoC({dataProp}: any) {
  return (
    <div>
        <h1>Component C</h1>
        <CompoD dataProp={dataProp}/>
    </div>
  )
}
