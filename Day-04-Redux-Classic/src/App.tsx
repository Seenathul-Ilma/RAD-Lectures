//import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./redux/store"
import { decrementing, valueSetting, incrementing } from "./redux/action/counterAction"
import CountView from "./countView"

export default function App() {

  // In React components you read state with useSelector(...) and send updates with dispatch(actionCreator()) using useDispatch().
  
  // useSelector subscribes the component to store updates and extracts the slice of state you need. 
  // The component re-renders only when the selected value changes.
  // Typing via RootState helps TypeScript validate the selector.
  const count = useSelector((state: RootState) => state.counter.initCount)

  // useDispatch() returns the dispatch function you call to send actions to the store.
  // In TypeScript, prefer const dispatch = useDispatch<AppDispatch>() (or create a typed useAppDispatch hook) so dispatch accepts thunks or typed actions correctly.
  const dispatch: AppDispatch = useDispatch()

  // When dispatch is called, the store runs reducers, produces next state (immutably), subscribers (React hooks) are notified and your component re-renders.

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
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  )
}

/*
The exact lifecycle when a button is clicked (event diagram)
1. User clicks + → handleIncrement() runs.
2. dispatch(incrementing()) is called.
3. Store receives action; reducers run. counterReducer sees an action with type myCounter/myIncrement and executes the addCase handler.
4. Reducer returns updated state (via Immer).
5. Store notifies subscribers. react-redux re-evaluates selectors; components using useSelector with that slice re-render if the value changed.
6. UI updates with the new count.
*/

/*
React already has useState and useContext, so why bring Redux into the picture?

🔹 Problem without Redux
- React manages state locally (inside components).
- When the app grows, passing state down as props (prop drilling) becomes messy.
- Managing shared state (e.g., user auth, theme, cart items) across many components is difficult.
- Debugging state changes is harder when state is spread across multiple components.

🔹 Why Redux?
Redux is a state management library that helps when your app becomes complex.

Main reasons to use Redux in React:
1. Centralized State Management
   - All global state is stored in a single store.
   - Components can directly access state from the store instead of passing props down many levels.

2. Predictable State Updates
   - State updates follow strict rules through reducers (pure functions).
   - This makes state changes predictable and easier to debug.

3. Easy Debugging (Redux DevTools)
   - You can see every state change, what action caused it, and even "time travel" (undo/redo state).

4. Better for Large-Scale Apps
   - Useful when many components need the same data (auth info, shopping cart, notifications).
   - Prevents inconsistent data across components.

5. Middleware Support
   - Helps handle async operations (like API calls) with tools like redux-thunk or redux-saga.

🔹 When to Use Redux
- App has global state shared across many components.
- State logic is complex (nested, interdependent updates).
- You need powerful debugging tools.
- You expect the app to scale and grow.

🔹 Classic Redux has 3 parts
1. Store → holds the global state (centralized data store)
2. Actions → plain objects that describe what happened (state update signal)
3. Reducers → pure functions that tell how state should change based on actions (state update function)

👉 For small apps, React’s useState or useContext is enough.
👉 For medium/large apps with complex state, Redux is a better choice.

*/
