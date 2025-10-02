
//import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from './redux/store' 


export default function CountView() {

  const count = useSelector((state: RootState) => state.counter.count)
  return (
    <div>
        <h1>This is the Count View Component</h1>
        <h2>Count in CounterView: {count}</h2>
    </div>
  )
}