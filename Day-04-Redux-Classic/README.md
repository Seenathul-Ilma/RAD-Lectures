# Redux Toolkit - Basic Counter Example

A beginner-friendly guide to Redux state management in React using Redux Toolkit with `createReducer` and `createAction`.

## Overview

This project demonstrates **Redux fundamentals** using Redux Toolkit's modern approach. It shows how to manage global state that multiple components can access and update, without prop drilling or complex context setups.

## What This Project Does

A simple counter app where:
- **Two components** (`App` and `CountView`) display the same counter value
- **Three buttons** increment, decrement, or reset the counter
- **Both components stay in sync** automatically through Redux

**Key Point:** When you click `+` in `App`, the count updates in **both** `App` and `CountView` instantly! 🎯

## Why Redux?

### The Problem Without Redux

**Using `useState`:**
```typescript
// App.tsx
const [count, setCount] = useState(0)

// Problem: CountView can't access this count!
// You'd need to pass it as props (prop drilling)
<CountView count={count} />
```

**Using `useContext`:**
```typescript
// Better than useState, but:
// - Manual state management
// - No debugging tools
// - No middleware for async logic
```

### The Solution: Redux

```typescript
// Any component can read from the store
const count = useSelector((state: RootState) => state.counter.initCount)

// Any component can update the store
dispatch(incrementing())
```

**Benefits:**
- ✅ Centralized state (one source of truth)
- ✅ Predictable updates (actions + reducers)
- ✅ Powerful debugging (Redux DevTools)
- ✅ No prop drilling
- ✅ Automatic component syncing

## When to Use Redux vs useState/useContext

| Feature            | useState          | useContext          | Redux                         |
|--------------------|-------------------|---------------------|-------------------------------|
| **Scope**          | Single component  | Multiple components | Entire app                    |
| **Best for**       | Local UI state    | Theme, auth         | Complex global state          |
| **Debugging**      | Basic console.log | Basic console.log   | Redux DevTools (time travel!) |
| **Learning curve** | Easy              | Easy                | Moderate                      |
| **Async logic**    | Manual            | Manual              | Middleware (thunks)           |
| **Best for apps**  | Small             | Small-Medium        | Medium-Large                  |

### Quick Decision Guide

```
Does only ONE component need this state?
    ↓
   YES → useState ✅

Does state need to be shared across 2-3 components?
    ↓
   YES → useContext ✅

Is state shared across many components with complex updates?
    ↓
   YES → Redux ✅
```

## File Structure

```
src/
├── App.tsx                      # Main component (displays count, buttons)
├── countView.tsx                # Second component (also displays count)
├── main.tsx                     # Wraps app with Redux Provider
└── redux/
    ├── store.ts                 # Redux store configuration
    ├── action/
    │   └── counterAction.ts     # Action creators (what happened)
    └── reducer/
        └── countReducer.ts      # Reducer (how state changes)
```

## How It Works

### The Redux Flow

```
User clicks button
    ↓
Component calls dispatch(incrementing())
    ↓
Store receives action: { type: "myCounter/myIncrement" }
    ↓
Reducer runs and updates state (initCount += 1)
    ↓
Store notifies all subscribers
    ↓
Components using useSelector re-render with new value
    ↓
UI updates in ALL components showing count! 🎉
```

### Step-by-Step Breakdown

#### 1. Define Actions (What Can Happen)

```typescript
// redux/action/counterAction.ts
import { createAction } from "@reduxjs/toolkit"

export const incrementing = createAction("myCounter/myIncrement")
export const decrementing = createAction("myCounter/myDecrement")
export const valueSetting = createAction<number>("myCounter/mySetValue")
```

**What's an action?**
- A plain object describing what happened
- Must have a `type` (string identifier)
- Can have a `payload` (data to update state)

**Example:**
```typescript
incrementing()  // Returns: { type: "myCounter/myIncrement" }
valueSetting(10)  // Returns: { type: "myCounter/mySetValue", payload: 10 }
```

#### 2. Create Reducer (How State Changes)

```typescript
// redux/reducer/countReducer.ts
import { createReducer } from "@reduxjs/toolkit"

const initialState = { initCount: 0 }

export const counterReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(incrementing, (state) => {
            state.initCount += 1  // Looks like mutation, but safe!
        })
        .addCase(decrementing, (state) => {
            state.initCount -= 1
        })
        .addCase(valueSetting, (state, action) => {
            state.initCount = action.payload
        })
})
```

**Key Concepts:**

**What's a reducer?**
- A pure function that takes current state + action
- Returns new state based on action type
- Must NEVER mutate original state (in classic Redux)

**Why does `state.initCount += 1` work here?**
Thanks to **Immer**! Redux Toolkit uses Immer internally:
- You write code that *looks* like mutation
- Immer secretly creates a new immutable state
- You get simplicity + safety!

**Classic Redux (Pre-redux tool) Vs. Redux with createAction + createReducer (Redux Toolkit style):**

```typescript
// ❌ Classic Redux (manual immutability)
function counterReducer(state = initialState, action) {
    switch(action.type) {
        case "INCREMENT":
            return { ...state, count: state.count + 1 }  // Manual copy
        default:
            return state
    }
}

// ✅ Redux Toolkit with Immer (looks like mutation)
builder.addCase(incrementing, (state) => {
    state.initCount += 1  // Immer handles immutability!
})
```

#### 3. Configure Store (Central State Container)

```typescript
// redux/store.ts
import { configureStore } from "@reduxjs/toolkit"
import { counterReducer } from "./reducer/countReducer"

export const store = configureStore({
    reducer: {
        counter: counterReducer  // State shape: { counter: { initCount: 0 } }
    }
})

// TypeScript helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**What's the store?**
- Holds the entire application state
- One store for the whole app (single source of truth)
- Components read from it using `useSelector`
- Components update it using `dispatch`

**State shape:**
```typescript
{
    counter: {
        initCount: 0
    }
}
```

#### 4. Provide Store to React (Connect Redux to React)

```typescript
// main.tsx
import { Provider } from "react-redux"
import { store } from "./redux/store"

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
```

**Why `<Provider>`?**
- Makes Redux store available to all components
- Uses React Context under the hood
- Without it, `useSelector`/`useDispatch` won't work!

#### 5. Read State in Components (useSelector)

```typescript
// App.tsx or countView.tsx
import { useSelector } from "react-redux"
import type { RootState } from "./redux/store"

const count = useSelector((state: RootState) => state.counter.initCount)
```

**What's `useSelector`?**
- React hook that reads data from Redux store
- Component automatically re-renders when selected value changes
- Takes a selector function: `(state) => state.counter.initCount`

**TypeScript tip:**
- `RootState` ensures type safety
- You get autocomplete for `state.counter.initCount`
- TypeScript catches typos at compile time

#### 6. Update State in Components (useDispatch)

```typescript
// App.tsx
import { useDispatch } from "react-redux"
import { incrementing, decrementing, valueSetting } from "./redux/action/counterAction"

const dispatch = useDispatch()

const handleIncrement = () => {
    dispatch(incrementing())  // Sends action to store
}

const handleDecrement = () => {
    dispatch(decrementing())
}

const handleReset = () => {
    dispatch(valueSetting(0))  // Action with payload
}
```

**What's `dispatch`?**
- Function that sends actions to the Redux store
- Store runs reducer → updates state → notifies components
- Any component can dispatch any action!

## Complete Flow Example

### User Clicks the `+` Button

```typescript
// 1. Button clicked
<button onClick={handleIncrement}>+</button>

// 2. Handler function runs
const handleIncrement = () => {
    dispatch(incrementing())
}

// 3. Action dispatched to store
// Action: { type: "myCounter/myIncrement" }

// 4. Reducer receives action
builder.addCase(incrementing, (state) => {
    state.initCount += 1  // 0 → 1
})

// 5. Immer produces new immutable state
// Old state: { counter: { initCount: 0 } }
// New state: { counter: { initCount: 1 } }

// 6. Store notifies all subscribers

// 7. Both App and CountView re-render
// App.tsx:      <h1>Count: 1</h1>
// CountView.tsx: <h2>Count in CounterView: 1</h2>

// ✅ Both components show updated value!
```

## Understanding Immer (The Magic Behind Redux Toolkit)

### The Problem: Immutability in Classic Redux

```typescript
// ❌ WRONG - Direct mutation (classic Redux)
function reducer(state, action) {
    state.count++  // Mutates original state
    return state   // Redux breaks!
}

// ✅ CORRECT - Manual immutability (classic Redux)
function reducer(state, action) {
    return {
        ...state,              // Copy old state
        count: state.count + 1  // Update count
    }
}
```

**Why immutability matters:**
- Redux compares old state vs new state (reference check)
- If you mutate, Redux thinks nothing changed
- Components won't re-render!

### The Solution: Immer in Redux Toolkit

```typescript
// Redux Toolkit with Immer
builder.addCase(incrementing, (state) => {
    state.initCount += 1  // Looks like mutation
})

// What Immer does internally:
// 1. Creates a "draft" proxy of state
// 2. You "mutate" the draft
// 3. Immer records changes
// 4. Produces new immutable state
// 5. Returns: { initCount: oldValue + 1 }
```

**Visual Example:**

```typescript
// Your code (looks like mutation)
state.initCount += 1

// What Immer produces (immutable)
Old state: { initCount: 5 }  ← Untouched
New state: { initCount: 6 }  ← Brand new object
```

**Benefits:**
- ✅ Write simple mutation-like code
- ✅ Get immutability automatically
- ✅ Redux debugging still works
- ✅ Performance optimizations still work

## The Three Core Concepts of Redux

### 1. Store (Central State Container)
```typescript
const store = configureStore({
    reducer: { counter: counterReducer }
})
```
- Holds entire application state
- Single source of truth
- One store per app

### 2. Actions (What Happened)
```typescript
dispatch(incrementing())  // { type: "myCounter/myIncrement" }
dispatch(valueSetting(5))  // { type: "myCounter/mySetValue", payload: 5 }
```
- Plain objects describing events
- Must have `type` property
- Optional `payload` for data

### 3. Reducers (How State Changes)
```typescript
builder.addCase(incrementing, (state) => {
    state.initCount += 1
})
```
- Pure functions: `(state, action) => newState`
- Handle specific action types
- Never mutate original state (Immer handles this!)

## Getting Started

### 1. Install Dependencies
```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Set Up Redux Files
Create the folder structure:
```
src/redux/
├── store.ts
├── action/
│   └── counterAction.ts
└── reducer/
    └── countReducer.ts
```

### 3. Wrap App with Provider
```typescript
// main.tsx
<Provider store={store}>
    <App />
</Provider>
```

### 4. Use Redux in Components
```typescript
// Read state
const count = useSelector((state: RootState) => state.counter.initCount)

// Update state
const dispatch = useDispatch()
dispatch(incrementing())
```

### 5. Run Your App
```bash
npm run dev
```

## Testing Your App

### Try This:
1. Open your app in the browser
2. Open Redux DevTools (browser extension)
3. Click the `+` button
4. Watch both `App` and `CountView` update together!
5. In DevTools, see the action and state change

### Redux DevTools
- Shows every action dispatched
- Shows state before and after each action
- Time-travel debugging (undo/redo actions!)

**Install:** [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)

## Common Patterns

### Pattern 1: Reading State
```typescript
const count = useSelector((state: RootState) => state.counter.initCount)
```
Component re-renders only when `initCount` changes.

### Pattern 2: Dispatching Actions
```typescript
const dispatch = useDispatch()
dispatch(incrementing())
```
Sends action to store, triggers reducer, updates state.

### Pattern 3: Actions with Payload
```typescript
// Action creator
export const valueSetting = createAction<number>("myCounter/mySetValue")

// Dispatch with data
dispatch(valueSetting(42))

// Reducer handles payload
.addCase(valueSetting, (state, action) => {
    state.initCount = action.payload  // 42
})
```

## TypeScript Tips

### Type the Selector
```typescript
const count = useSelector((state: RootState) => state.counter.initCount)
//                         ^^^^^^^^^^^^^^^^ Provides autocomplete!
```

### Type the Dispatch
```typescript
const dispatch: AppDispatch = useDispatch()
//             ^^^^^^^^^^^^^ Supports typed actions and thunks
```

### Why These Types Matter
- `RootState`: Ensures you access correct state paths
- `AppDispatch`: Ensures you dispatch correct actions
- Catches typos at compile time, not runtime!

## Troubleshooting

**Problem:** "Cannot read property 'initCount' of undefined"  
**Solution:** Make sure `<Provider store={store}>` wraps your app

**Problem:** State updates but component doesn't re-render  
**Solution:** Check your `useSelector` - make sure you're selecting the right path

**Problem:** "dispatch is not a function"  
**Solution:** Make sure you're inside the `<Provider>` and using `useDispatch()` correctly

**Problem:** TypeScript errors in reducer  
**Solution:** Install `@reduxjs/toolkit` and use `createReducer` or `createSlice`

## Redux Toolkit vs Classic Redux

| Feature            |    Classic Redux     |          Redux Toolkit               |
|--------------------|----------------------|--------------------------------------|
| **Store setup**    | Manual               | `configureStore()`                   |
| **Reducers**       | Switch statements    | `createReducer()` or `createSlice()` |
| **Immutability**   | Manual (`...spread`) | Automatic (Immer)                    |
| **Actions**        | Manual objects       | `createAction()`                     |
| **DevTools**       | Manual setup         | Auto-included                        |
| **Boilerplate**    | Lots of code         | Much less code                       |
| **Learning curve** | Steeper              | Gentler                              |

**Redux Toolkit is the modern, recommended way!**

## Next Steps: Redux Slice (Coming Soon!)

This example uses:
- ✅ `createAction` (manual action creators)
- ✅ `createReducer` (manual reducer)

**Next level:** `createSlice` combines both!

```typescript
// Future: createSlice (auto-generates actions + reducer)
const counterSlice = createSlice({
    name: "counter",
    initialState: { initCount: 0 },
    reducers: {
        increment(state) { state.initCount += 1 },
        decrement(state) { state.initCount -= 1 },
        setValue(state, action) { state.initCount = action.payload }
    }
})

// Actions auto-generated!
export const { increment, decrement, setValue } = counterSlice.actions
export default counterSlice.reducer
```

**Benefits of `createSlice`:**
- Less boilerplate
- Actions auto-generated
- Less file organization
- Same functionality!

## When to Use Redux

✅ **Use Redux when:**
- Multiple components need same state
- State updates are complex
- You need debugging tools (DevTools)
- App will grow and scale
- Team needs predictable state management

❌ **Skip Redux when:**
- App is small (< 5 components)
- State is mostly local
- You're just learning React (master basics first!)
- `useState` or `useContext` is enough

## Summary: The Redux Data Flow

```
1. UI Event (button click)
        ↓
2. Dispatch Action (incrementing())
        ↓
3. Store receives action
        ↓
4. Reducer runs (state.initCount += 1)
        ↓
5. Immer produces new state
        ↓
6. Store updates
        ↓
7. Subscribers notified (useSelector)
        ↓
8. Components re-render
        ↓
9. UI updates (both App and CountView!)
```

---

**Key Takeaway:** Redux provides a centralized, predictable way to manage state across your entire app. With Redux Toolkit and Immer, it's easier than ever to write Redux code that's simple, safe, and powerful!

**Remember:** Start with `useState` for local state, move to `useContext` for simple shared state, and use Redux when your app needs serious state management. Master the basics before optimizing! 

Happy state managing! 🎉