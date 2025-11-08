# Redux Toolkit - Counter with `createSlice` (Modern Approach)

The simplest and most modern way to use Redux in React using Redux Toolkit's `createSlice` API.

## Overview

This project demonstrates **Redux with `createSlice`** - the recommended modern approach for Redux state management. It automatically generates actions and reducers in one place, eliminating boilerplate and making Redux development much faster and cleaner.

## What's Different: `createSlice` vs Previous Approaches

### Evolution of Redux

#### Classic Redux (Most Boilerplate)
```typescript
// Actions (separate file)
const INCREMENT = 'counter/increment'
export const increment = () => ({ type: INCREMENT })

// Reducer (separate file)
export function counterReducer(state = { count: 0 }, action) {
    switch(action.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 }  // Manual immutability
        default:
            return state
    }
}
```

#### Redux Toolkit with `createReducer` + `createAction` (Less Boilerplate)
```typescript
// Actions (separate file)
export const incrementing = createAction("counter/incrementing")

// Reducer (separate file)
export const counterReducer = createReducer(initialState, (builder) => {
    builder.addCase(incrementing, (state) => {
        state.count += 1  // Immer handles immutability
    })
})
```

#### Redux Toolkit with `createSlice` (Minimal Boilerplate) ✅
```typescript
// Everything in ONE place!
const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        incrementing: (state) => {
            state.count += 1  // Immer + auto-generated actions!
        }
    }
})

// Actions are auto-generated!
export const { incrementing } = counterSlice.actions
export default counterSlice.reducer
```

## Comparison Table

| Feature          | Classic Redux                     | createReducer + createAction  | createSlice ✅                |
|------------------|-----------------------------------|-------------------------------|-------------------------------|
| **Actions**      | Manual objects/functions          | `createAction()` separate     | **Auto-generated**            |
| **Reducer**      | Switch-case + manual immutability | `builder.addCase()` + Immer   | **`reducers` object + Immer** |
| **Files needed** | 2+ (actions + reducer)            | 2 (actions + reducer)         | **1 (slice file)**            |
| **Boilerplate**  | High                              | Medium                        | **Minimal**                   |
| **Syntax**       | `switch(action.type)`             | `builder.addCase()`           | **Simple object**             |
| **TypeScript**   | Manual typing everywhere          | Manual typing                 | **Better auto-inference**     |
| **Action types** | Manual strings                    | Manual strings                | **Auto-prefixed**             |
| **Maintenance**  | Hard (scattered code)             | Medium                        | **Easy (one file)**           |

## Why `createSlice` is Better

### 1. **Everything in One Place**
```typescript
// One slice file contains:
// ✅ Initial state
// ✅ Reducers (how state changes)
// ✅ Actions (auto-generated)
const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        incrementing: (state) => { state.count += 1 },
        decrementing: (state) => { state.count -= 1 },
        valueSetting: (state, action) => { state.count = action.payload }
    }
})
```

### 2. **Actions Auto-Generated**
```typescript
// No need to write createAction!
export const { incrementing, decrementing, valueSetting } = counterSlice.actions

// These are automatically created:
// incrementing() → { type: "counter/incrementing" }
// valueSetting(5) → { type: "counter/valueSetting", payload: 5 }
```

### 3. **Action Types Auto-Prefixed**
```typescript
// Slice name: "counter"
// Action: incrementing
// Generated type: "counter/incrementing" ✅ (automatic!)

// No naming collisions across slices!
```

### 4. **Less Code, Same Power**
```typescript
// Classic Redux: ~30 lines
// createReducer: ~20 lines
// createSlice: ~10 lines ✅
```

## File Structure

```
src/
├── App.tsx                      # Main component
├── countView.tsx                # Second component
├── main.tsx                     # Redux Provider wrapper
└── redux/
    ├── store.ts                 # Store configuration
    └── features/
        └── counterSlice.ts      # ⭐ Everything in one file!
```

**Notice:** No separate `actions/` folder needed! Everything is in the slice.

## How It Works

### Step 1: Create a Slice

```typescript
// redux/features/counterSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    count: 0
}

const counterSlice = createSlice({
    name: "counter",                    // Used for action type prefix
    initialState,                       // Starting state
    reducers: {                         // Functions that update state
        incrementing: (state) => {
            state.count += 1            // Immer allows "mutation"
        },
        decrementing: (state) => {
            state.count -= 1
        },
        valueSetting: (state, action: PayloadAction<number>) => {
            state.count = action.payload
        }
    }
})

// Export auto-generated actions
export const { incrementing, decrementing, valueSetting } = counterSlice.actions

// Export reducer to include in store
export default counterSlice.reducer
```

**What's happening:**
- `createSlice` creates both reducer and actions
- `name: "counter"` → action types become `"counter/incrementing"`, `"counter/decrementing"`, etc.
- `reducers` object → each function becomes an action + case handler
- Actions are exported from `counterSlice.actions`
- Reducer is exported as default

### Step 2: Configure Store

```typescript
// redux/store.ts
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counterSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer  // State shape: { counter: { count: 0 } }
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

**Key points:**
- Import the reducer (default export from slice)
- State key `counter` → access via `state.counter.count`
- TypeScript types for type safety

### Step 3: Provide Store to App

```typescript
// main.tsx
import { Provider } from 'react-redux'
import { store } from './redux/store'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
)
```

**Same as before** - `<Provider>` makes store available to all components.

### Step 4: Use in Components

```typescript
// App.tsx
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./redux/store"
import { incrementing, decrementing, valueSetting } from "./redux/features/counterSlice"

export default function App() {
    // Read state
    const count = useSelector((state: RootState) => state.counter.count)
    
    // Get dispatch
    const dispatch: AppDispatch = useDispatch()

    // Dispatch actions (auto-generated!)
    const handleIncrement = () => dispatch(incrementing())
    const handleDecrement = () => dispatch(decrementing())
    const handleReset = () => dispatch(valueSetting(0))

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={handleIncrement}>+</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleDecrement}>-</button>
        </div>
    )
}
```

**Notice:** 
- Import actions directly from the slice
- No need to know action type strings
- Same `useSelector` and `useDispatch` as before

## The Complete Flow

```
1. User clicks "+" button
    ↓
2. dispatch(incrementing()) is called
    ↓
3. Action sent to store: { type: "counter/incrementing" }
    ↓
4. counterSlice reducer handles the action
    ↓
5. Reducer executes: state.count += 1
    ↓
6. Immer creates new immutable state
    ↓
7. Store updates: { counter: { count: 1 } }
    ↓
8. Components with useSelector re-render
    ↓
9. UI shows updated count! ✅
```

## Understanding `createSlice` Internals

### What `createSlice` Does Behind the Scenes

```typescript
const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        incrementing: (state) => { state.count += 1 }
    }
})
```

**Internally, this creates:**

1. **Action creator function:**
```typescript
function incrementing() {
    return { type: "counter/incrementing" }
}
```

2. **Reducer case:**
```typescript
builder.addCase("counter/incrementing", (state) => {
    state.count += 1
})
```

3. **Combined reducer:**
```typescript
function counterReducer(state, action) {
    if (action.type === "counter/incrementing") {
        // Immer draft logic
        state.count += 1
    }
    // ... other cases
}
```

**You get all three automatically!** 🎉

### Action Type Generation

```typescript
// Slice name: "counter"
// Reducer name: "incrementing"
// Generated type: "counter/incrementing"

// This prevents naming conflicts:
// userSlice.incrementing → "user/incrementing"
// counterSlice.incrementing → "counter/incrementing"
```

### Immer Integration

```typescript
// Your code (looks like mutation)
incrementing: (state) => {
    state.count += 1
}

// What Immer produces (immutable)
{
    count: state.count + 1  // New object created
}
```

**Benefits:**
- Write simple code
- Get immutability for free
- Redux DevTools work perfectly

## Reducers with Payloads

### Simple Action (No Payload)
```typescript
incrementing: (state) => {
    state.count += 1
}

// Usage:
dispatch(incrementing())  // No arguments needed
```

### Action with Payload
```typescript
valueSetting: (state, action: PayloadAction<number>) => {
    state.count = action.payload
}

// Usage:
dispatch(valueSetting(42))  // Pass the value
```

**TypeScript Tip:**
- `PayloadAction<number>` types the payload as a number
- You get autocomplete for `action.payload`
- TypeScript catches wrong types at compile time

## Multiple Slices Example

For larger apps, you'll have multiple slices:

```typescript
// redux/features/counterSlice.ts
const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: { /* ... */ }
})

// redux/features/userSlice.ts
const userSlice = createSlice({
    name: "user",
    initialState: { name: "", isLoggedIn: false },
    reducers: { /* ... */ }
})

// redux/features/todoSlice.ts
const todoSlice = createSlice({
    name: "todos",
    initialState: { items: [] },
    reducers: { /* ... */ }
})

// redux/store.ts
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        todos: todoReducer
    }
})

// State shape:
// {
//     counter: { count: 0 },
//     user: { name: "", isLoggedIn: false },
//     todos: { items: [] }
// }
```

## Getting Started

### 1. Install Dependencies
```bash
npm install @reduxjs/toolkit react-redux
```

### 2. Create Slice File
```typescript
// redux/features/counterSlice.ts
import { createSlice } from "@reduxjs/toolkit"

const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        increment: (state) => { state.count += 1 }
    }
})

export const { increment } = counterSlice.actions
export default counterSlice.reducer
```

### 3. Configure Store
```typescript
// redux/store.ts
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counterSlice"

export const store = configureStore({
    reducer: { counter: counterReducer }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### 4. Wrap App with Provider
```typescript
// main.tsx
<Provider store={store}>
    <App />
</Provider>
```

### 5. Use in Components
```typescript
// App.tsx
import { increment } from "./redux/features/counterSlice"

const count = useSelector((state: RootState) => state.counter.count)
const dispatch = useDispatch()

<button onClick={() => dispatch(increment())}>+</button>
```

### 6. Run Your App
```bash
npm run dev
```

## Common Patterns

### Pattern 1: Simple State Update
```typescript
increment: (state) => {
    state.count += 1
}

// Usage:
dispatch(increment())
```

### Pattern 2: Update with Payload
```typescript
addTodo: (state, action: PayloadAction<string>) => {
    state.todos.push({ id: Date.now(), text: action.payload })
}

// Usage:
dispatch(addTodo("Buy milk"))
```

### Pattern 3: Complex State Update
```typescript
updateUser: (state, action: PayloadAction<{ name: string; age: number }>) => {
    state.name = action.payload.name
    state.age = action.payload.age
    state.lastUpdated = Date.now()
}

// Usage:
dispatch(updateUser({ name: "Alice", age: 25 }))
```

### Pattern 4: Conditional Logic
```typescript
toggleTodo: (state, action: PayloadAction<number>) => {
    const todo = state.todos.find(t => t.id === action.payload)
    if (todo) {
        todo.completed = !todo.completed
    }
}

// Usage:
dispatch(toggleTodo(123))
```

## Migration Guide

### From Classic Redux to `createSlice`

**Before (Classic Redux):**
```typescript
// actions.ts
export const INCREMENT = 'INCREMENT'
export const increment = () => ({ type: INCREMENT })

// reducer.ts
export function counterReducer(state = { count: 0 }, action) {
    switch(action.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 }
        default:
            return state
    }
}
```

**After (createSlice):**
```typescript
// counterSlice.ts
const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        increment: (state) => { state.count += 1 }
    }
})

export const { increment } = counterSlice.actions
export default counterSlice.reducer
```

**Changes:**
1. Delete `actions.ts` file
2. Replace switch-case with reducers object
3. Export actions from `counterSlice.actions`
4. Export reducer as default

### From `createReducer` + `createAction` to `createSlice`

**Before:**
```typescript
// actions.ts
export const incrementing = createAction("counter/incrementing")

// reducer.ts
export const counterReducer = createReducer(initialState, (builder) => {
    builder.addCase(incrementing, (state) => { state.count += 1 })
})
```

**After:**
```typescript
// counterSlice.ts
const counterSlice = createSlice({
    name: "counter",
    initialState: { count: 0 },
    reducers: {
        incrementing: (state) => { state.count += 1 }
    }
})

export const { incrementing } = counterSlice.actions
export default counterSlice.reducer
```

**Changes:**
1. Combine actions and reducer in one slice
2. Remove `createAction` imports
3. Remove `createReducer` and `builder`
4. Use simpler `reducers` object syntax

## Advantages of `createSlice`

✅ **Less Code**
- 50% less boilerplate than classic Redux
- 30% less than createReducer + createAction

✅ **Better Organization**
- Everything in one file
- Easy to find related logic
- Scales well with multiple slices

✅ **Auto-Generated Actions**
- No manual action creators
- No typos in action types
- Consistent naming

✅ **Immer Built-In**
- Write "mutating" code safely
- Automatic immutability
- Simpler state updates

✅ **TypeScript Friendly**
- Better type inference
- Less manual typing
- Safer refactoring

✅ **Redux DevTools**
- Works automatically
- Time-travel debugging
- Action history tracking

## When to Use `createSlice`

✅ **Always use `createSlice` for new projects!**

It's the official recommended approach from Redux team.

**Use `createSlice` when:**
- Starting a new Redux project
- You want minimal boilerplate
- You need good TypeScript support
- You want maintainable code
- You're using Redux Toolkit (which you should!)

**Only use classic Redux when:**
- Maintaining legacy code
- Learning Redux fundamentals
- Specific edge cases (very rare)

## Troubleshooting

**Problem:** Actions not auto-generated  
**Solution:** Check you're exporting from `counterSlice.actions`

**Problem:** Reducer not updating state  
**Solution:** Make sure you exported `counterSlice.reducer` as default

**Problem:** State shape different than expected  
**Solution:** Check the key in `configureStore({ reducer: { counter: ... } })`

**Problem:** TypeScript errors with payload  
**Solution:** Use `PayloadAction<Type>` to type the action parameter

**Problem:** Can't find slice exports  
**Solution:** Check import paths - actions come from `slice.actions`, reducer from default export

## Best Practices

### 1. One Slice Per Feature
```
redux/features/
├── counterSlice.ts
├── userSlice.ts
├── todoSlice.ts
└── cartSlice.ts
```

### 2. Descriptive Slice Names
```typescript
// ✅ Good
createSlice({ name: "shoppingCart", ... })
createSlice({ name: "userAuth", ... })

// ❌ Bad
createSlice({ name: "sc", ... })
createSlice({ name: "data", ... })
```

### 3. Type Your Payloads
```typescript
// ✅ Good
addTodo: (state, action: PayloadAction<string>) => { ... }

// ❌ Bad
addTodo: (state, action: any) => { ... }
```

### 4. Keep Reducers Pure
```typescript
// ✅ Good - no side effects
increment: (state) => { state.count += 1 }

// ❌ Bad - side effects
increment: (state) => {
    state.count += 1
    console.log(state.count)  // Side effect!
    localStorage.setItem('count', state.count)  // Side effect!
}
```

### 5. Use Meaningful Action Names
```typescript
// ✅ Good
createSlice({
    reducers: {
        incrementCounter,
        decrementCounter,
        resetCounter
    }
})

// ❌ Bad
createSlice({
    reducers: {
        inc,
        dec,
        reset
    }
})
```

---

**Summary:** `createSlice` is the modern, recommended way to use Redux. It combines actions and reducers in one place, auto-generates action creators, and uses Immer for safe "mutations". Less code, same power!

**Remember:** Start with `createSlice` for all new projects. It's simpler, cleaner, and more maintainable than older approaches. The Redux team recommends it for a reason! 🚀

Happy state managing with `createSlice`! 🎉