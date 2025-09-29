// 01) ---------------------------------------------------- useRef Hook --------------------------------------------------------------

// useRef acts like useState, but updating it does NOT trigger a re-render and can also hold a reference to a DOM element.

// 1. Persisting a Value Across Renders Without Triggering Re-render
//      - Sometimes, you want to keep a value that doesn’t need to trigger a re-render when it changes.
//      - useRef allows you to store such values.
//      - useState → Changing the state re-renders the component.
//      - useRef → Changing the .current value does NOT re-render the component.
//      - Use useState if you want the UI to update automatically.
//      - Use useRef if you just need to keep a value around without updating the UI.

// 2. Accessing DOM Elements Directly
//      - useRef is commonly used to get a reference to a DOM element in React, similar to document.getElementById
//      - useState cannot hold a DOM element reference in a way that lets you interact with it directly.
//      - Can store a reference to any DOM element (like input, div, etc.).
//      - Allows direct DOM manipulation (focus, scroll, etc.).
//      - useState cannot store DOM references like this

// 3. Storing Mutable Values
//      - Useful for storing values between renders that don’t affect UI, like timers, intervals, previous state values, etc.
//      - useState always creates a new value and triggers a render when updated.


// useRef -> store a value

//import React from 'react'
/* import { useRef, useEffect } from 'react'

export default function App() {
  const ref = useRef(0)    // default value -> hold by 'current' keyword

  console.log("------+------")
  console.log(ref)    // ref is an object
  console.log(ref.current)  // always value is stored here in 'current'. 
  console.log("------+------")


  useEffect(() => {
    console.log("Component is re-rendered")
  })

  const handleClick = () => {
    ref.current += 1     // ref.current = ref.current + 1
    console.log("Inside handleClick: "+ ref.current)
  }

  return (
    <div>
      <button onClick={handleClick}>Click</button>
    </div>
  )
} */

// [vite] connecting...
// ------+------
// {current: 0}               // useRef object showing current value
// 0                          // accessing the current value of the ref
// ------+------
// [object Object]            // printing the ref itself as an object
// 0                          // still shows the current value inside the ref
// ------+------
// Component is re-rendered   // indicates a re-render happened
// Component is re-rendered   // re-render happened again

// Inside handleClick: 1      // output from clicking button, incrementing value
// Inside handleClick: 2
// Inside handleClick: 3
// ...
// Inside handleClick: 16     // demonstrates that the ref value updates without triggering re-render


// `````````````````````````````````````````````````````````````


// useRef -> store a reference to any DOM element (most common use case)
// Allows direct access to manipulate DOM elements without re-rendering

//import React from 'react'
/* import { useRef } from 'react'

export default function App() {

  const inputRef = useRef<any>(null)  
  // inputRef initially null, will point to <input> element after render

  const handleClick = () => {
    // Use optional chaining to safely access current, in case it's null
    // why inputRef?.current
    // -----------------
    // The '?' is optional chaining. 
    // inputRef.current is initially null before the input element is rendered.
    // Using inputRef?.current safely checks if current exists before calling focus().
    // Without '?', trying to access focus() on null would throw an error.
    inputRef?.current.focus()  
    // Focus the input field when button is clicked

    if(inputRef.current) {
      inputRef.current.style.backgroundColor = "yellow"  
      // Change input background color using reference
    }
  }

  return (
    <div>
      {/* Assign ref to input element to access it via inputRef }
      <input ref={inputRef} />
      <button onClick={handleClick}>Click</button>
    </div>
  )
} */




// 02) ---------------------------------------------------- useMemo Hook --------------------------------------------------------------

// useMemo -> memoizes a computed value
// It caches the result of a function and only recalculates 
// when its dependencies change.
// Useful to avoid expensive calculations or unnecessary re-renders


//import React from 'react'
/* import { useState, useMemo } from "react"

// Simulate an expensive calculation
const inputHandler = (value: any) => {
  let sum = 0
  for (let i = 0; i < 1000000000; i++) {
    sum++
  }
  return value
}

export default function App() {
  const [name, setName] = useState("")   // controlled input for name
  const [email, setEmail] = useState("") // controlled input for email

  // Without useMemo:
  // const data = inputHandler(name)
  // => inputHandler runs on every render, even if 'name' didn't change,
  //    making the app slow for expensive calculations.
  // => So typing in the email input also triggers the function, causing lag.


  // With useMemo:
  const data = useMemo(() => {
    return inputHandler(name) 
    // function result is cached in memory and only recalculated 
    // if 'name' changes
  }, [name])  // dependency array: re-run function only when 'name' changes

  console.log("rendered") // logs every re-render

  return (
    <div>
      <input 
        placeholder="name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        placeholder="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <p>{data}</p> {/* display cached result }
    </div>
  )
}
 */
// Key Points :-
// useMemo caches the result of a function to avoid expensive recalculations
// Only recalculates when dependencies in the array change (here, [name])
// Helps optimize performance for slow or heavy computations





// 03) ---------------------------------------------------- useCallback Hook --------------------------------------------------------------
// useCallback -> memoizes a function
// Keeps the same function reference between renders
// Useful when passing functions to child components or useEffect
// Only recreates the function when dependencies change

//import React from 'react'
/* import { useState, useEffect, useCallback } from 'react'

export default function App() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [result, setResult] = useState("")

  // Without useCallback:
  // Every time component re-renders, this function would be recreated.
  // const myFunction = () => {
  //   console.log("myFunction running")
  //   return "Hello"
  // }

  // With useCallback + [email]:
  // Function will be recreated ONLY when 'email' changes.
  // If 'email' doesn’t change, the same cached function is reused.
  // const myFunction = useCallback(() => {
  //   console.log("My Function is running")
  //   return "Hello"
  // }, [email])    
  
  // With useCallback + []:
  // Function is created only once (on first render)
  // → cached reference will be reused for every re-render
  const myFunction = useCallback(() => {
    console.log("myFunction running")
    return "Hello"
  }, [])

  // useEffect depends on myFunction,
  // but since the function reference never changes ([]) 
  // → effect will run only once (on mount)
  useEffect(() => {
    console.log("UseEffect running")
    setResult(myFunction())
  }, [myFunction])

  console.log("component re-rendered")

  return (
    <div>
      <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <p>{result}</p>
    </div>
  )
}
 */



// 04) ---------------------------------------------------- useReducer Hook --------------------------------------------------------------
// useReducer is used when we have complex state logic
// useReducer is an alternative to useState when state logic is complex.
// or multiple (large set of) values in one state object.
// Instead of writing multiple useState hooks, we centralize updates inside a reducer function with "actions".
// Keeps update logic in one place → via reducer function.

// useState → good for simple state (one or two values).
// useReducer → better for complex state objects or when 
//    multiple state values need to be updated in a structured way.


// Core parts:
// 1) reducer(state, action) → pure function that updates state (logic for update states by handling action and returns new state)
// 2) state → current state object/value
// 3) dispatch({ type, data }) → sends an action to reducer function

import { useReducer } from "react"

// i. Reducer function → takes current state + action, returns new state
//    keeps state update logic in one place (easy to maintain & scale)
//    You can name it anything (const reducer -> const userReducer)
const reducer = (state: any, action: any) => {
  console.log("action : ", action)   // Debug: see what action is dispatched

  switch (action.type) {
    case "ID":
      return { ...state, id: action.data }     // update only id
    case "NAME":
      return { ...state, name: action.data }   // update only name
    case "EMAIL":
      return { ...state, email: action.data }  // update only email
    case "AGE":
      return { ...state, age: action.data }    // update only age
    default:
      return state   // return current state if action is unknown
  }
}

const App = () => {

  // ii. State (initial values)
  // useReducer returns → [state, dispatch]
  // - state: holds the object (id, name, email, age)
  // - dispatch: function used to send actions to reducer
  // state is just a variable. You can rename it to match your domain: const [user, userDispatch] = useReducer(userReducer, ...)
  // Same with dispatch — it’s just a function returned by React. You can rename it: const [formData, updateForm] = useReducer(formReducer, ...)
  const [state, dispatch] = useReducer(reducer, {
    id: "",
    name: "",
    email: "",
    age: 0
  })  // <- assume this is a complex state logic here  {id: "", name: "", email: "", age: 0}

  console.log("Current State:", state)

  return (
    <div>
      {/* iii. Action (dispatched to reducer) - Dispatch actions with type + data */}
      {/* // IMPORTANT:
              // - state.<property> must match the keys in the initial state object
              // - dispatch({ type: "X" }) must match the corresponding case "X" in the reducer
      */}
      <input
        placeholder="ID"
        value={state.id}
        onChange={(e) => dispatch({ type: "ID", data: e.target.value })}
      />

      <input
        placeholder="Name"
        value={state.name}
        onChange={(e) => dispatch({ type: "NAME", data: e.target.value })}
      />

      <input
        placeholder="Email"
        value={state.email}
        onChange={(e) => dispatch({ type: "EMAIL", data: e.target.value })}
      />

      <input
        placeholder="Age"
        value={state.age}
        onChange={(e) => dispatch({ type: "AGE", data: e.target.value })}
      />
    </div>
  )
}

export default App
