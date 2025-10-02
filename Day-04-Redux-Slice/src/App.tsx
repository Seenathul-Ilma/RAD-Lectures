//import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./redux/store"
import { decrementing, incrementing, valueSetting } from "./redux/features/counterSlice"
import CountView from "./countView"

export default function App() {

  // const count = useSelector((state) => {
  //   console.log(state)
  //   return state.counter.count
  // })
  const count = useSelector((state: RootState) => state.counter.count)

  const dispatch: AppDispatch = useDispatch()

  const handleIncrement = () => {
    dispatch(incrementing())
  }

  const handleDecrement = () => {
    dispatch(decrementing())
  }

  const handleReset = () => {
    dispatch(valueSetting(0))
  }

  return (
    <div>
      <CountView />
      <h1>Count: {count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleReset}>reset</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  )
}

/*
| Feature     | Classic Redux                                | createReducer (RTK)  - (Day-04-Redux-Classic)               | createSlice (RTK)                                 |
| ----------- | -------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------- |
| Actions     | Must manually define objects or functions    | Can use `createAction`                                      | Auto-generated                                    |
| Reducer     | Must return new state manually (no mutation) | Can write “mutating” code with `createReducer` (uses Immer) | Same as createReducer but bundled in slice        |
| Store       | `createStore()`                              | `configureStore()`                                          | `configureStore()`                                |
| Boilerplate | High (actions + reducer + types)             | Less (state , reducers + actions in separate places)        | Minimal (state + reducers + actions in one place) |
| Syntax      | switch-case                                  | builder.addCase()                                           | reducers object inside slice                      |
| TypeScript  | manual typing                                | manual typing                                               | auto inference easier with slice                  |


3️⃣ Why createSlice is simpler
- You don’t need `createAction` separately like in classic Redux or `createReducer`.
- Action types are automatically prefixed with slice name (e.g., `counter/incriment`).
- Reducers can use mutating syntax thanks to Immer.
- Everything is contained in one file → easier to maintain.
*/

