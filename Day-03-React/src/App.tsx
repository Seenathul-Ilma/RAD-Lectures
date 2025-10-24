// ----------------------- Component Lifecycle ------------------------

// What is a Component Lifecycle?
// The lifecycle of a React component refers to the stages a component goes through from the moment it is created (mounted) to the time it is removed (unmounted) from the DOM.

// There are three main phases:
//  - Mounting : Component is created and inserted into the DOM.
//  - Updating : Component’s state or props change, causing a re-render.
//  - Unmounting : Component is removed from the DOM.

// 1. Class Component Lifecycle (Predefined lifecycle methods)

/* import React from 'react'
import ClassComponent from './components/ClassComponent'

export default function App() {
  return (
    <div>
      <ClassComponent />
    </div>
  )
} */

// 2. Functional Component Lifecycle (using Hooks)
// Functional components don’t have built-in lifecycle methods — instead, they use Hooks (useEffect, useState, etc.) to mimic lifecycle behavior.

/* 
// ES7+ React/Redux/React Native Snippets - Extension
// Install the above extension and use snippets
// type 'rfc' for create components by short way

import { useEffect, useState } from "react";

//import React from 'react'

export default function App() {

  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)  

  // useEffect Hook
  // Handles side effects and lifecycle events (API calls, subscriptions, timers, etc.)

  //useEffect(() => {
      // Code here runs after render (similar to componentDidMount + componentDidUpdate)
      //return () => {
          // Cleanup (similar to componentWillUnmount)
      //};
  //}, [dependencies]);


  // Both are same
  //useEffect(() => {}, [])
  //useEffect(function(){
  //  console.log("Test")
  //},[])

  // Run on every render (mount + re-render)
  useEffect(() => {
    console.log("Component rendered");
  });

  // Run only once on mount
  useEffect(() => {
    console.log("Component mounted");
  }, []); // [] - Empty Dependency Array

  // Run when specific state or props change (mount + dependency value changes)
  useEffect(() => {
    console.log("Data changed:", value);
  }, [value]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>

      <div>
      <h1>Value: {value}</h1>
      <button onClick={() => setValue((prev) => prev + 1)}>Increment Value</button>
      </div>
    </div>
  )
}
 */


// --------------------- How Props Travels From Parent To Child --------------------

// Props (short for properties) are how React components receive data from their parent. (Only Parent to child. Not child to parent)
// Here, the name prop travels from Parent → Child.
// That’s normal — props are meant for top-down communication.

/* import React from 'react'
import CompoBase from './components/CompoBase'

export default function App() {
  return (
    <div>
      <CompoBase conceptName="Prop Drilling - Prop Travels from Parent → Child" />
    </div>
  )
} 
 */


// --------------------- Prop Drilling --------------------

// Prop Drilling happens when you pass props through many layers of components — even though only a deeply nested child actually needs the data.

// In simple words:
// “You’re drilling props down through components that don’t need them, just to reach the one that does.

// Here:
// App → CompoA → CompoB → CompoC → CompoD
// Only CompoD needs data, but the prop gets passed through every component in between.
// That’s prop drilling.

// Why Prop Drilling Is a Problem ?
// 🔹Hard to Read	→ Code becomes confusing with too many props being passed down.
// 🔹Tight Coupling →	Intermediate components are forced to accept props they don’t care about.
// 🔹Hard to Maintain → Changing data structure or adding/removing components breaks multiple layers.
// 🔹Reusability Drops → Components become less reusable because they rely on unrelated props.

// How to Fix Prop Drilling
// React provides three main solutions, depending on complexity.
// 🔹A. React Context API (Best built-in fix)
// Context lets you create a global data provider so any component can access data directly — no drilling (no need to pass data through CompoA or CompoB.).
// 🔹B. State Management Libraries
// When your app gets bigger, you can use libraries like: Redux Toolkit, Zustand, Recoil, Jotai
// They help manage global state more efficiently than Context in large apps.
// 🔹C. Component Composition (if small)
// If only one level of passing is needed, it’s okay to compose components directly without overengineering.

//import React from 'react'
import { useState } from 'react'
import CompoA from './components/CompoA'

export default function App() {
    const [data, setData] = useState("Initial Data")

  return (
    <>
      <h1>Component App</h1>
      <h2>Data: {data}</h2>
      
      <CompoA dataProp={data}/>
    </>
  )
}