# React Component Lifecycle & Props - Essential Guide

A clean, beginner-friendly guide to understanding Component Lifecycle and Props/Prop Drilling in React. 🚀

---

## 📑 Table of Contents

1. [Component Lifecycle Overview](#component-lifecycle-overview)
2. [Class Component Lifecycle](#class-component-lifecycle)
3. [Functional Component Lifecycle](#functional-component-lifecycle)
4. [Understanding Props](#understanding-props)
5. [Prop Drilling Problem](#prop-drilling-problem)
6. [Solutions to Prop Drilling](#solutions-to-prop-drilling)
7. [Best Practices](#best-practices)

---

## Component Lifecycle Overview

### What is Component Lifecycle?

The **lifecycle** refers to the stages a React component goes through from creation to removal.

### Three Main Phases

| Phase | Description | When It Happens |
|-------|-------------|-----------------|
| **Mounting** | Component is created and inserted into the DOM | Component first appears |
| **Updating** | Component's state or props change, causing re-render | State/props change |
| **Unmounting** | Component is removed from the DOM | Component disappears |

```
Component Created → Mounted → Updates (state/props change) → Unmounted
     (Birth)         ↓           ↓ (Multiple times)            (Death)
                   Rendered    Re-rendered
```

---

## Class Component Lifecycle

### Lifecycle Methods (Old Way)

Class components have predefined lifecycle methods for each phase.

### Lifecycle Order

```typescript
// 1️⃣ MOUNTING PHASE (Component appears)
constructor()                    // Initialize state
↓
getDerivedStateFromProps()       // Sync state with props
↓
render()                         // Return JSX
↓
componentDidMount()              // After component appears in DOM

// 2️⃣ UPDATING PHASE (State/props change)
getDerivedStateFromProps()       // Before update
↓
shouldComponentUpdate()          // Should re-render? (true/false)
↓
render()                         // Re-render JSX
↓
getSnapshotBeforeUpdate()        // Before DOM updates
↓
componentDidUpdate()             // After DOM updates

// 3️⃣ UNMOUNTING PHASE (Component disappears)
componentWillUnmount()           // Cleanup before removal
```

### Complete Class Component Example

```typescript
import { Component } from 'react'

export default class ClassComponent extends Component<any, any> {
  // 1️⃣ MOUNTING
  constructor(props: any) {
    super(props)
    this.state = { count: 0 }
    console.log("1️⃣ constructor() - Initialize state")
  }

  static getDerivedStateFromProps(props: any, state: any) {
    console.log("2️⃣ getDerivedStateFromProps() - Sync state with props")
    return null  // Return null or new state
  }

  componentDidMount() {
    console.log("4️⃣ componentDidMount() - Component is in DOM!")
    // Good place for API calls, subscriptions, timers
  }

  // 2️⃣ UPDATING
  shouldComponentUpdate() {
    console.log("🌀 shouldComponentUpdate() - Should re-render?")
    return true  // Return false to prevent re-render
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log("📸 getSnapshotBeforeUpdate() - Before DOM update")
    return null  // Return value passed to componentDidUpdate
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    console.log("✅ componentDidUpdate() - After DOM update")
    console.log("Previous state:", prevState)
    // Good for responding to prop/state changes
  }

  // 3️⃣ UNMOUNTING
  componentWillUnmount() {
    console.log("💀 componentWillUnmount() - Component removing")
    // Cleanup: clear timers, cancel requests, unsubscribe
  }

  render() {
    console.log("3️⃣ render() - Rendering JSX")
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    )
  }
}
```

### Common Lifecycle Methods

| Method | Phase | Common Use |
|--------|-------|------------|
| `constructor()` | Mounting | Initialize state |
| `componentDidMount()` | Mounting | API calls, subscriptions |
| `componentDidUpdate()` | Updating | Respond to changes |
| `componentWillUnmount()` | Unmounting | Cleanup (timers, subscriptions) |
| `render()` | Both | Return JSX |

### Console Output Example

```
// Initial Mount:
1️⃣ constructor()
2️⃣ getDerivedStateFromProps()
3️⃣ render()
4️⃣ componentDidMount()

// After Clicking Button:
2️⃣ getDerivedStateFromProps()
🌀 shouldComponentUpdate()
3️⃣ render()
📸 getSnapshotBeforeUpdate()
✅ componentDidUpdate()

// When Component Removed:
💀 componentWillUnmount()
```

---

## Functional Component Lifecycle

### Using Hooks (Modern Way)

Functional components don't have lifecycle methods. Instead, they use **hooks** (mainly `useEffect`) to handle lifecycle events.

### useEffect Hook Patterns

```typescript
import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)

  // Pattern 1: Run on EVERY render (mount + all re-renders)
  useEffect(() => {
    console.log("Component rendered")
  })  // No dependency array

  // Pattern 2: Run ONCE on mount only
  useEffect(() => {
    console.log("Component mounted")
    
    // Cleanup on unmount
    return () => {
      console.log("Component unmounted")
    }
  }, [])  // Empty dependency array []

  // Pattern 3: Run when SPECIFIC state/props change
  useEffect(() => {
    console.log("Value changed:", value)
  }, [value])  // Runs when 'value' changes

  // Pattern 4: Multiple dependencies
  useEffect(() => {
    console.log("Count or Value changed")
  }, [count, value])

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
      
      <h1>Value: {value}</h1>
      <button onClick={() => setValue(prev => prev + 1)}>Increment</button>
    </div>
  )
}
```

### Dependency Array Explained

| Pattern | Behavior | Use Case |
|---------|----------|----------|
| `useEffect(() => {})` | Runs after EVERY render | Logging, debugging |
| `useEffect(() => {}, [])` | Runs ONCE on mount | API calls, subscriptions |
| `useEffect(() => {}, [dep])` | Runs when `dep` changes | React to specific changes |
| `useEffect(() => {}, [a, b])` | Runs when `a` or `b` changes | Multiple dependencies |

### Cleanup Function

```typescript
useEffect(() => {
  // Setup
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)

  // Cleanup (runs on unmount)
  return () => {
    clearInterval(timer)
    console.log('Timer cleaned up')
  }
}, [])
```

**When cleanup runs:**
- Before component unmounts
- Before effect runs again (if dependencies change)

### Class vs Functional Lifecycle

| Class Component | Functional Component (useEffect) |
|----------------|----------------------------------|
| `componentDidMount()` | `useEffect(() => {}, [])` |
| `componentDidUpdate()` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount()` | `return () => {}` in useEffect |
| `render()` | Return JSX directly |

### Simple Comparison Example

```typescript
// ❌ Class Component (Old)
class Timer extends Component {
  componentDidMount() {
    this.timer = setInterval(() => console.log('Tick'), 1000)
  }
  
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  
  render() {
    return <div>Timer</div>
  }
}

// ✅ Functional Component (Modern)
function Timer() {
  useEffect(() => {
    const timer = setInterval(() => console.log('Tick'), 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  return <div>Timer</div>
}
```

---

## Understanding Props

### What are Props?

**Props** (properties) are how React components receive data from their parent.

### Key Characteristics

- ✅ **Read-only** - Cannot be modified by child
- ✅ **Top-down** - Flow from parent → child only
- ✅ **Any data type** - strings, numbers, objects, arrays, functions
- ❌ **Not bidirectional** - Child cannot send props back to parent

### Simple Props Example

```typescript
// Parent Component
function App() {
  return (
    <div>
      <CompoBase conceptName="Props Travel Parent → Child" />
    </div>
  )
}

// Child Component
function CompoBase({ conceptName }: any) {
  return (
    <div>
      <h1>Base Component</h1>
      <h2>{conceptName}</h2>
    </div>
  )
}
```

### Props Flow

```
App (Parent)
  └─ data: "Hello"
     ↓ (passes as prop)
  Child Component
     └─ receives: { data: "Hello" }
        ↓ (displays)
     UI: "Hello"
```

---

## Prop Drilling Problem

### What is Prop Drilling?

**Prop Drilling** occurs when you pass props through multiple layers of components, even though only a deeply nested child actually needs the data.

### The Problem

```typescript
// App → CompoA → CompoB → CompoC → CompoD
// Only CompoD needs 'data', but it passes through A, B, C

function App() {
  const [data, setData] = useState("Initial Data")
  
  return <CompoA dataProp={data} />
}

function CompoA({ dataProp }: any) {
  return (
    <div>
      <h1>Component A</h1>
      <CompoB dataProp={dataProp} />  {/* Just passing through */}
    </div>
  )
}

function CompoB({ dataProp }: any) {
  return (
    <div>
      <h1>Component B</h1>
      <CompoC dataProp={dataProp} />  {/* Just passing through */}
    </div>
  )
}

function CompoC({ dataProp }: any) {
  return (
    <div>
      <h1>Component C</h1>
      <CompoD dataProp={dataProp} />  {/* Just passing through */}
    </div>
  )
}

function CompoD({ dataProp }: any) {
  return (
    <div>
      <h1>Component D</h1>
      <h2>Finally used here: {dataProp}</h2>  {/* Actually uses it */}
    </div>
  )
}
```

### Visual Representation

```
App (has data)
 ↓ props
CompoA (doesn't need it, just passes)
 ↓ props
CompoB (doesn't need it, just passes)
 ↓ props
CompoC (doesn't need it, just passes)
 ↓ props
CompoD (actually uses it!) ✅
```

### Why Prop Drilling is Bad

| Problem | Description |
|---------|-------------|
| 🔹 **Hard to Read** | Code becomes confusing with too many props |
| 🔹 **Tight Coupling** | Components forced to accept unrelated props |
| 🔹 **Hard to Maintain** | Changing structure breaks multiple layers |
| 🔹 **Less Reusable** | Components become dependent on specific props |

---

## Solutions to Prop Drilling

### Solution 1: Context API (Built-in, Best for Most Cases)

Context lets components access data directly without passing through intermediaries.

```typescript
import { createContext, useContext, useState } from 'react'

// 1. Create Context
const DataContext = createContext<any>(null)

// 2. Provider Component
function App() {
  const [data, setData] = useState("Initial Data")
  
  return (
    <DataContext.Provider value={data}>
      <CompoA />  {/* No props needed! */}
    </DataContext.Provider>
  )
}

// 3. Intermediate components don't need props
function CompoA() {
  return (
    <div>
      <h1>Component A</h1>
      <CompoB />
    </div>
  )
}

function CompoB() {
  return (
    <div>
      <h1>Component B</h1>
      <CompoC />
    </div>
  )
}

function CompoC() {
  return (
    <div>
      <h1>Component C</h1>
      <CompoD />
    </div>
  )
}

// 4. Use context in the component that needs it
function CompoD() {
  const data = useContext(DataContext)  // Direct access!
  
  return (
    <div>
      <h1>Component D</h1>
      <h2>Data: {data}</h2>
    </div>
  )
}
```

**Benefit:** Components A, B, C don't need to handle props they don't use!

### Solution 2: State Management Libraries

For larger apps with complex state:

```typescript
// Redux Toolkit
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'

// Zustand (simpler than Redux)
import create from 'zustand'

const useStore = create((set) => ({
  data: "Initial Data",
  setData: (data: string) => set({ data })
}))

function CompoD() {
  const data = useStore((state) => state.data)
  return <h2>Data: {data}</h2>
}
```

### Solution 3: Component Composition

For shallow nesting, pass components as children:

```typescript
function App() {
  const data = "Initial Data"
  
  return (
    <CompoA>
      <CompoD data={data} />  {/* Direct access, no drilling */}
    </CompoA>
  )
}

function CompoA({ children }: any) {
  return (
    <div>
      <h1>Component A</h1>
      {children}
    </div>
  )
}
```

### When to Use Each Solution

| Solution | Best For | Complexity |
|----------|----------|------------|
| **Context API** | Medium apps, shared state (theme, auth) | Low |
| **Redux/Zustand** | Large apps, complex state management | Medium-High |
| **Component Composition** | Simple cases, 1-2 levels deep | Very Low |

---

## Best Practices

### Lifecycle Best Practices

✅ **Do:**
```typescript
// Clean up effects
useEffect(() => {
  const timer = setInterval(() => {}, 1000)
  return () => clearInterval(timer)
}, [])

// Use dependency array correctly
useEffect(() => {
  fetchData(userId)
}, [userId])

// Use functional updates
setCount(prev => prev + 1)
```

❌ **Don't:**
```typescript
// Missing dependencies
useEffect(() => {
  console.log(count)
}, [])  // Should include [count]

// Missing cleanup
useEffect(() => {
  setInterval(() => {}, 1000)  // Memory leak!
}, [])

// Infinite loops
useEffect(() => {
  setCount(count + 1)  // Triggers re-render → effect runs again!
})
```

### Props Best Practices

✅ **Do:**
```typescript
// Destructure props
function Child({ name, age }: Props) {
  return <div>{name}, {age}</div>
}

// Use TypeScript for type safety
interface Props {
  name: string
  age: number
}

// Pass only what's needed
<Child name={user.name} age={user.age} />
```

❌ **Don't:**
```typescript
// Pass entire object when only one field needed
<Child user={user} />  // Child only needs name

// Modify props
function Child({ data }: any) {
  data.name = "New"  // DON'T! Props are read-only
}

// Drill props unnecessarily
// Use Context instead
```

### Prop Drilling Solutions

✅ **Use Context when:**
- Data needed by many components at different levels
- Props passed through 3+ intermediate components
- Global data (theme, auth, language)

❌ **Don't use Context for:**
- Simple parent → child communication
- Local component state
- Frequently changing data (can cause performance issues)

---

## Quick Reference

### Lifecycle Hooks Cheatsheet

```typescript
// Mount only
useEffect(() => {
  // Runs once
}, [])

// Update only
useEffect(() => {
  // Runs on value change
}, [value])

// Mount + Update
useEffect(() => {
  // Runs on every render
})

// Cleanup
useEffect(() => {
  return () => {
    // Cleanup before unmount
  }
}, [])
```

### Common Lifecycle Patterns

```typescript
// API call on mount
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => setData(data))
}, [])

// Timer with cleanup
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)
  
  return () => clearInterval(timer)
}, [])

// Subscribe/Unsubscribe
useEffect(() => {
  const subscription = subscribe()
  
  return () => subscription.unsubscribe()
}, [])
```

---

## Summary

### Key Takeaways

**Lifecycle:**
1. Three phases: Mounting, Updating, Unmounting
2. Class components have lifecycle methods
3. Functional components use `useEffect`
4. Always clean up effects

**Props:**
1. Props flow from parent → child only
2. Props are read-only
3. Prop drilling = passing props through unnecessary components
4. Use Context API to avoid prop drilling

**Best Practices:**
- Use functional components with hooks (modern)
- Clean up timers, subscriptions, listeners
- Use Context for global state
- Avoid prop drilling with Context or composition

---

## Resources

- [React Lifecycle Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [useEffect Documentation](https://react.dev/reference/react/useEffect)
- [Context API Guide](https://react.dev/learn/passing-data-deeply-with-context)
- [Component Lifecycle](https://react.dev/learn/lifecycle-of-reactive-effects)

---

**Made with ❤️ for React Developers**

*Last Updated: 2025*

Happy coding! 🚀