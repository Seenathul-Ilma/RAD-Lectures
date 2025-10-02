
//import React from 'react'
import { useSelector } from 'react-redux'
// RootState is a TypeScript type representing the entire Redux store state.
// It comes from your store definition: export type RootState = ReturnType<typeof store.getState>
import type { RootState } from './redux/store' 

// Using RootState ensures type safety in useSelector.
// Without it, TypeScript wouldn’t know that state.counter.initCount exists, and you could get type errors.

export default function CountView() {

  // useSelector is a React-Redux hook that lets a component read state from the Redux store.
  // You pass it a function (called a selector) that takes the entire store state and returns the part you want.
  const count = useSelector((state: RootState) => state.counter.initCount)

  // Here:
  // state = the whole Redux store state.
  // state.counter = your counter reducer slice.
  // state.counter.initCount = the number you want to display.
  // So count will always reflect the current counter value from the store.

  return (
    <div>
        <h1>This is the Count View Component</h1>
        <h2>Count in CounterView: {count}</h2>
    </div>
  )
}


/*
1️⃣ useState is local state
const [count, setCount] = useState(0)

- Only exists inside this component.
- If another component (like App) also wants count, you’d have to pass it as props.
- Updating it in one component does not automatically update other components.

✅ Works fine for simple, isolated state.
❌ Not ideal when multiple components need the same shared state.

--------------------------------------------------------

2️⃣ useContext is global-ish state

- React Context lets you share state across components without prop drilling.
- You’d wrap components in a <Context.Provider> and use useContext to read/write values.
- Better than useState for multiple components, but:
  • Still manual management for updating state.
  • Doesn’t have built-in tools for time-travel debugging, middleware, or async logic.

--------------------------------------------------------

3️⃣ Why Redux (and useSelector) is used here

- CountView and App both need the same counter value.
- Redux provides a centralized store that all components can read from and dispatch actions to.
- Benefits over useState/useContext:
  • Centralized global state → no prop drilling.
  • Predictable updates → reducers decide exactly how state changes.
  • Debugging → Redux DevTools shows every action and state change.
  • Middleware support → handle async logic, logging, etc.

--------------------------------------------------------

4️⃣ In your code
const count = useSelector((state: RootState) => state.counter.initCount)

- Reads the global counter value from Redux store.
- Automatically re-renders this component if initCount changes anywhere in the app.
- If you used useState here instead:
  • Only this component would update.
  • App or CountView would not stay in sync without passing props.

--------------------------------------------------------

✅ Summary
Hook                  | Scope             | When to use
--------------------- | ----------------- | ----------------------------------------
useState              | Local component   | State only needed in one component
useContext            | Cross-component   | Shared state, simple updates, no middleware needed
useSelector (Redux)   | Global store      | Shared state across many components, complex updates, debugging, async support
*/
