# React Advanced Hooks - Essential Guide

A clean, beginner-friendly guide to mastering **useRef**, **useMemo**, **useCallback**, and **useReducer**. Less code, more understanding! 🚀

---

## 📑 Table of Contents

1. [Quick Overview](#quick-overview)
2. [useRef Hook](#useref-hook)
3. [useMemo Hook](#usememo-hook)
4. [useCallback Hook](#usecallback-hook)
5. [useReducer Hook](#usereducer-hook)
6. [Comparison & When to Use](#comparison--when-to-use)
7. [Common Mistakes](#common-mistakes)
8. [Best Practices](#best-practices)

---

## Quick Overview

### Why Learn These Hooks?

- **useRef** - Access DOM elements, store values without re-rendering
- **useMemo** - Cache expensive calculations
- **useCallback** - Cache functions to prevent re-renders
- **useReducer** - Manage complex state logic

### Hook Comparison at a Glance

| Hook | Purpose | Triggers Re-render | Best For |
|------|---------|-------------------|----------|
| `useState` | Simple state | ✅ Yes | Simple values |
| `useRef` | Mutable reference | ❌ No | DOM refs, timers |
| `useMemo` | Cache value | ✅ Yes | Expensive calculations |
| `useCallback` | Cache function | ✅ Yes | Functions to children |
| `useReducer` | Complex state | ✅ Yes | Related state updates |

---

## useRef Hook

### What Does It Do?

**useRef** creates a mutable reference that:
- Persists across renders
- Does NOT trigger re-renders when updated
- Can hold references to DOM elements

### Three Main Uses

#### 1. Store Values Without Re-rendering

```typescript
const clickCount = useRef(0)

const handleClick = () => {
  clickCount.current += 1  // Updates but NO re-render!
  console.log('Clicks:', clickCount.current)
}
```

**Key Point:** Changes to `ref.current` don't trigger re-renders.

#### 2. Access DOM Elements

```typescript
const inputRef = useRef<HTMLInputElement>(null)

const handleFocus = () => {
  inputRef.current?.focus()  // Direct DOM access
  inputRef.current.style.backgroundColor = "yellow"
}

return <input ref={inputRef} />
```

**Key Point:** Use optional chaining (`?.`) because ref starts as null.

#### 3. Store Timer IDs

```typescript
const timerRef = useRef<number | null>(null)

const startTimer = () => {
  timerRef.current = setInterval(() => {
    console.log('Tick')
  }, 1000)
}

const stopTimer = () => {
  if (timerRef.current) {
    clearInterval(timerRef.current)
  }
}
```

### useState vs useRef

| Feature | useState | useRef |
|---------|----------|--------|
| Triggers re-render | ✅ Yes | ❌ No |
| Persists across renders | ✅ Yes | ✅ Yes |
| Update method | `setState(value)` | `ref.current = value` |
| Best for | UI state | Timers, DOM refs |

### When to Use useRef

✅ **Use when:**
- Accessing DOM elements (focus, scroll)
- Storing timer/interval IDs
- Tracking previous values
- Values that don't affect UI

❌ **Don't use when:**
- Value should update the UI (use useState)
- You need to trigger re-renders

---

## useMemo Hook

### What Does It Do?

**useMemo** caches the result of a calculation and only recalculates when dependencies change.

### The Problem It Solves

```typescript
// ❌ Problem: Runs on EVERY render (slow!)
const filtered = items.filter(item => item.active)

// ✅ Solution: Only runs when 'items' changes
const filtered = useMemo(() => {
  return items.filter(item => item.active)
}, [items])
```

### Simple Example

```typescript
const [name, setName] = useState("")
const [email, setEmail] = useState("")

// Without useMemo: runs even when typing in email
// const data = expensiveCalculation(name)

// With useMemo: only runs when 'name' changes
const data = useMemo(() => {
  return expensiveCalculation(name)
}, [name])
```

### Real-World Uses

```typescript
// Filtering large lists
const filteredUsers = useMemo(() => {
  return users.filter(user => 
    user.name.includes(searchTerm)
  )
}, [users, searchTerm])

// Sorting data
const sortedData = useMemo(() => {
  return [...data].sort((a, b) => a.price - b.price)
}, [data])

// Complex calculations
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0)
}, [items])
```

### When to Use useMemo

✅ **Use when:**
- Expensive calculations (loops, heavy math)
- Filtering/sorting large arrays (1000+ items)
- Complex data transformations

❌ **Don't use when:**
- Simple calculations (`count * 2`)
- Calculation is already fast
- Dependencies change frequently

### Quick Rule

If the calculation takes less than 1ms, you probably don't need useMemo!

---

## useCallback Hook

### What Does It Do?

**useCallback** caches a function and keeps the same reference between renders.

### The Problem It Solves

```typescript
// ❌ Problem: New function every render → child re-renders
const handleClick = () => console.log('Clicked')

// ✅ Solution: Same function reference → child doesn't re-render
const handleClick = useCallback(() => {
  console.log('Clicked')
}, [])
```

### Simple Example

```typescript
const [name, setName] = useState("")
const [email, setEmail] = useState("")

// Function recreated ONLY when email changes
const myFunction = useCallback(() => {
  console.log("Function running")
  return "Hello"
}, [email])

// useEffect runs only when myFunction changes
useEffect(() => {
  setResult(myFunction())
}, [myFunction])
```

### Real-World Use: Preventing Child Re-renders

```typescript
const Parent = () => {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  
  // Without useCallback: Child re-renders when typing
  // const handleClick = () => console.log('Clicked')
  
  // With useCallback: Child doesn't re-render when typing
  const handleClick = useCallback(() => {
    console.log('Clicked')
  }, [])
  
  return (
    <>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MemoizedChild onClick={handleClick} />
    </>
  )
}

// Child must be wrapped in memo!
const MemoizedChild = memo(({ onClick }) => {
  console.log('Child rendered')
  return <button onClick={onClick}>Click Me</button>
})
```

### useMemo vs useCallback

```typescript
// useMemo: Returns cached VALUE
const value = useMemo(() => calculateValue(a, b), [a, b])

// useCallback: Returns cached FUNCTION
const fn = useCallback(() => doSomething(a, b), [a, b])

// They're equivalent:
useCallback(fn, deps) === useMemo(() => fn, deps)
```

### When to Use useCallback

✅ **Use when:**
- Passing functions to memoized child components
- Functions used in useEffect dependencies
- Performance-critical event handlers

❌ **Don't use when:**
- Function isn't passed as a prop
- Child components aren't memoized
- Simple event handlers

### Critical Rule

**useCallback only helps if the child component is wrapped in `React.memo`!**

---

## useReducer Hook

### What Does It Do?

**useReducer** manages complex state using a reducer function. Think of it as centralized state management.

### When to Use

| Use useState | Use useReducer |
|--------------|----------------|
| Simple state (1-2 values) | Complex state objects |
| Independent updates | Related updates |
| Basic toggle/increment | Multiple update patterns |

### Core Structure

```typescript
// 1. Reducer function (all update logic here)
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.data }
    case "RESET":
      return { name: "", email: "", age: 0 }
    default:
      return state
  }
}

// 2. Use in component
const [state, dispatch] = useReducer(reducer, {
  name: "",
  email: "",
  age: 0
})

// 3. Update state by dispatching actions
dispatch({ type: "SET_NAME", data: "John" })
dispatch({ type: "RESET" })
```

### Simple Form Example

```typescript
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.data }
    case "SET_EMAIL":
      return { ...state, email: action.data }
    case "RESET":
      return { name: "", email: "" }
    default:
      return state
  }
}

function Form() {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    email: ""
  })
  
  return (
    <div>
      <input
        value={state.name}
        onChange={(e) => dispatch({ 
          type: "SET_NAME", 
          data: e.target.value 
        })}
      />
      <input
        value={state.email}
        onChange={(e) => dispatch({ 
          type: "SET_EMAIL", 
          data: e.target.value 
        })}
      />
      <button onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </div>
  )
}
```

### Todo List Example

```typescript
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, done: false }]
    
    case 'TOGGLE':
      return state.map(todo =>
        todo.id === action.id 
          ? { ...todo, done: !todo.done } 
          : todo
      )
    
    case 'DELETE':
      return state.filter(todo => todo.id !== action.id)
    
    default:
      return state
  }
}

function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, [])
  const [input, setInput] = useState('')
  
  const handleAdd = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD', text: input })
      setInput('')
    }
  }
  
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch({ type: 'TOGGLE', id: todo.id })}
            />
            <span>{todo.text}</span>
            <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Key Concepts

**Reducer Function:**
- Takes current `state` and `action`
- Returns new state
- Must be pure (no side effects)

**Dispatch:**
- Sends actions to reducer
- Action has `type` and optional data

**State:**
- Current state value
- Updated by reducer function

### Important Notes

```typescript
// ✅ Correct: Return new state
case 'UPDATE':
  return { ...state, value: action.data }

// ❌ Wrong: Mutate state
case 'UPDATE':
  state.value = action.data  // DON'T DO THIS!
  return state

// Naming is flexible
const [state, dispatch] = useReducer(reducer, initial)
const [user, userDispatch] = useReducer(userReducer, initialUser)
const [formData, updateForm] = useReducer(formReducer, initialForm)
```

---

## Comparison & When to Use

### Decision Tree

```
Need to store data?
├─ Does it affect UI?
│  ├─ Yes
│  │  ├─ Simple value? → useState
│  │  └─ Complex/related updates? → useReducer
│  └─ No → useRef
│
Need expensive calculation?
└─ → useMemo

Need to pass function to child?
└─ Is child memoized? → useCallback
```

### Quick Reference

```typescript
// Simple independent state
const [count, setCount] = useState(0)

// Complex related state
const [state, dispatch] = useReducer(reducer, initialState)

// DOM access / Non-UI values
const inputRef = useRef<HTMLInputElement>(null)

// Expensive calculation
const result = useMemo(() => calculate(data), [data])

// Function for memoized child
const handler = useCallback(() => {}, [])
```

### Real-World Scenarios

| Scenario | Hook to Use |
|----------|-------------|
| Counter/toggle | `useState` |
| Form with 5+ fields | `useReducer` |
| Focus input | `useRef` |
| Filter 1000+ items | `useMemo` |
| Shopping cart | `useReducer` |
| Timer ID | `useRef` |
| Sort large array | `useMemo` |
| Event handler for memo'd child | `useCallback` |

---

## Common Mistakes

### 1. Using useRef for UI State

```typescript
// ❌ Wrong: UI won't update!
const count = useRef(0)
count.current += 1

// ✅ Correct: Use useState
const [count, setCount] = useState(0)
setCount(count + 1)
```

### 2. Forgetting Dependencies

```typescript
// ❌ Wrong: Stale closure
const handleClick = useCallback(() => {
  console.log(count)  // Always logs initial count!
}, [])

// ✅ Correct: Include dependencies
const handleClick = useCallback(() => {
  console.log(count)
}, [count])

// ✅ Or use functional update
const handleClick = useCallback(() => {
  setCount(prev => prev + 1)
}, [])
```

### 3. Mutating State in Reducer

```typescript
// ❌ Wrong: Mutating state
case 'ADD':
  state.items.push(action.item)
  return state

// ✅ Correct: Return new state
case 'ADD':
  return {
    ...state,
    items: [...state.items, action.item]
  }
```

### 4. Over-optimizing

```typescript
// ❌ Unnecessary - adds overhead
const double = useMemo(() => count * 2, [count])
const greeting = useCallback(() => console.log('Hi'), [])

// ✅ Just use regular code
const double = count * 2
const greeting = () => console.log('Hi')
```

### 5. Forgetting Optional Chaining

```typescript
// ❌ Wrong: Can throw error
inputRef.current.focus()

// ✅ Correct: Use optional chaining
inputRef.current?.focus()

// ✅ Or use if check
if (inputRef.current) {
  inputRef.current.focus()
}
```

---

## Best Practices

### 1. Choose the Right Hook

```typescript
// Simple state → useState
const [count, setCount] = useState(0)

// Complex state → useReducer
const [state, dispatch] = useReducer(reducer, initial)

// DOM access → useRef
const ref = useRef(null)

// Expensive calc → useMemo
const filtered = useMemo(() => filter(data), [data])

// Function to child → useCallback
const handler = useCallback(() => {}, [])
```

### 2. Name Things Clearly

```typescript
// ✅ Good
const [isLoading, setIsLoading] = useState(false)
const inputRef = useRef<HTMLInputElement>(null)

// ❌ Bad
const [x, setX] = useState(false)
const ref = useRef(null)
```

### 3. Don't Optimize Early

Start simple, optimize only when you have performance issues!

### 4. Use TypeScript

```typescript
// Type-safe reducer
interface State {
  count: number
}

type Action = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
  }
}
```

### 5. Clean Up Effects

```typescript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)
  
  // Always clean up!
  return () => clearInterval(timer)
}, [])
```

---

## Summary

### Key Takeaways

1. **useRef** - DOM access and non-UI values
2. **useMemo** - Cache expensive calculations
3. **useCallback** - Cache functions (with React.memo)
4. **useReducer** - Complex related state

### Quick Tips

✅ **Do:**
- Start with useState, optimize later
- Use useRef for DOM and timers
- Use useMemo for expensive operations
- Use useCallback with React.memo
- Use useReducer for complex state

❌ **Don't:**
- Over-optimize simple code
- Forget dependencies in hooks
- Mutate state in reducers
- Use useRef for UI state
- Skip cleanup in effects

### Remember

**The best optimization is no optimization until you need it!**

---

## Resources

- [React Hooks Docs](https://react.dev/reference/react)
- [useRef Reference](https://react.dev/reference/react/useRef)
- [useMemo Reference](https://react.dev/reference/react/useMemo)
- [useCallback Reference](https://react.dev/reference/react/useCallback)
- [useReducer Reference](https://react.dev/reference/react/useReducer)

---

**Made with ❤️ for React Developers**

*Last Updated: 2025*

Happy coding! 🚀