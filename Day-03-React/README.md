# React Concepts - Complete Beginner-Friendly Guide

A comprehensive, easy-to-understand reference guide covering React fundamentals, hooks, lifecycle management, and best practices for modern React development.

---

## 📑 Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding State](#understanding-state)
3. [Hooks vs State](#hooks-vs-state)
4. [Essential React Hooks](#essential-react-hooks)
5. [Component Lifecycle](#component-lifecycle)
6. [Props & Props Drilling](#props--props-drilling)
7. [Context API](#context-api)
8. [Routing](#routing)
9. [Best Practices](#best-practices)
10. [Useful Tools & Extensions](#useful-tools--extensions)
11. [Common Interview Questions](#common-interview-questions)
12. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Installation & Setup

#### Option 1: Create React App (CRA) - Traditional
```bash
npx create-react-app my-app
cd my-app
npm start
```

#### Option 2: Vite (Recommended - Faster) ⚡
```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev
```

### Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom hooks
├── context/        # Context providers
├── pages/          # Page/route components
├── utils/          # Helper functions
├── styles/         # CSS/styling files
├── App.jsx         # Main app component
└── main.jsx        # Entry point (or index.js)
```

---

## Understanding State

### What is State? 🤔

**State is React's way of storing data that can change over time.** Think of it as the component's "memory" that persists between renders and triggers UI updates when changed.

**Real-world analogy:** Imagine a light switch. The current position (on/off) is the "state." When you flip the switch, the state changes, and the light updates accordingly.

### Key Characteristics

| Feature | Description |
|---------|-------------|
| ✅ Component Memory | Exists within a component and persists across renders |
| ✅ Triggers Re-renders | Changing state automatically updates the UI |
| ✅ Independent | Each component has its own isolated state |
| ✅ Flexible Types | Can hold any data type (string, number, object, array, boolean) |
| ❌ Not Regular Variables | Normal variables don't persist or trigger re-renders |

### Basic State Usage

```javascript
import { useState } from 'react';

function Counter() {
  // Declare state with initial value of 0
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Breaking it down:**
- `count` → Current state value (the data)
- `setCount` → Function to update state (the setter)
- `useState(0)` → Hook that initializes state with value 0

**What happens when you click the button:**
1. `setCount(count + 1)` is called
2. React updates the state
3. Component re-renders with new value
4. UI shows updated count

### State with Different Data Types

```javascript
// Primitive values
const [name, setName] = useState('');           // String
const [age, setAge] = useState(0);              // Number
const [isActive, setIsActive] = useState(false); // Boolean

// Objects
const [user, setUser] = useState({ 
  name: '', 
  email: '',
  age: 0
});

// Arrays
const [items, setItems] = useState([]);
const [todos, setTodos] = useState([
  { id: 1, text: 'Learn React', done: false },
  { id: 2, text: 'Build a project', done: false }
]);
```

### Updating State Correctly ⚠️

**❌ WRONG - Direct Mutation (Don't do this!):**
```javascript
count = count + 1;              // Won't trigger re-render
user.name = 'John';             // Mutates state directly - BAD!
items.push(newItem);            // Mutates array - BAD!
todos[0].done = true;           // Mutates nested object - BAD!
```

**✅ CORRECT - Using Setter Functions:**
```javascript
// Primitives - simple update
setCount(count + 1);

// Objects - spread operator to create new object
setUser({ ...user, name: 'John' });

// Arrays - spread operator to create new array
setItems([...items, newItem]);

// Update specific item in array
setTodos(todos.map(todo => 
  todo.id === 1 ? { ...todo, done: true } : todo
));

// Remove item from array
setItems(items.filter(item => item.id !== deleteId));
```

### Functional Updates (Advanced) 🔄

When new state depends on previous state, use functional updates:

```javascript
// ❌ Can be problematic with async updates
setCount(count + 1);

// ✅ Safe - always uses the most recent state
setCount(prevCount => prevCount + 1);

// ✅ Useful for multiple rapid updates
const handleMultipleClicks = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  // Count increases by 3
};
```

### Important Rules 📌

1. **Never mutate state directly** - Always use setter functions
2. **State updates are asynchronous** - Don't rely on immediate updates
3. **Each component has isolated state** - State doesn't leak between components
4. **Batch updates** - React may batch multiple state updates for performance
5. **Immutability** - Create new objects/arrays instead of modifying existing ones

---

## Hooks vs State

### The Fundamental Difference 🎯

Many beginners confuse hooks with state. Let's clarify:

| Aspect | State | Hooks |
|--------|-------|-------|
| **What is it?** | Data stored in component | Special functions that enable React features |
| **Purpose** | Holds component memory | Provides capabilities (state, effects, context, etc.) |
| **Type** | Data (number, string, object, etc.) | Function calls |
| **Effect** | Changes trigger re-renders | Enable features like state management |

### Visual Understanding

```javascript
// useState is a HOOK that enables STATE
const [count, setCount] = useState(0);
//     ^^^^^ ^^^^^^^^        ^^^^^^^^
//     STATE  SETTER         HOOK
//    (data) (function)   (React tool)
```

### Key Insights

- **STATE** = The actual data you're storing
- **HOOKS** = Tools React gives you to work with features
- **Hooks enable state, but they are not state itself**

**Example:** Think of hooks as tools in a toolbox:
- `useState` is like a screwdriver that lets you manage state
- `useEffect` is like a hammer that lets you handle side effects
- The actual screws (data) you're working with is the state

### Where Hooks Work

Hooks only work in:
- ✅ Functional components
- ✅ Custom hooks
- ❌ Class components
- ❌ Regular JavaScript functions
- ❌ Loops or conditions
- ❌ Nested functions

---

## Essential React Hooks

### 1. useState - Manage State 🎛️

The most fundamental hook for adding state to functional components.

```javascript
import { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    if (!email) newErrors.email = 'Email required';
    if (!password) newErrors.password = 'Password required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit logic
    console.log('Login successful:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      </div>
      
      <div>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### 2. useEffect - Handle Side Effects & Lifecycle 🔄

Performs side effects (data fetching, subscriptions, DOM manipulation) after render.

**What are side effects?** Anything that affects things outside the component:
- API calls
- Timers
- DOM manipulation
- Subscriptions
- Logging

```javascript
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs on mount and when userId changes
  useEffect(() => {
    setLoading(true);
    
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [userId]); // Re-run when userId changes

  // Cleanup example (important!)
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Ping every 5 seconds');
    }, 5000);

    // Cleanup function (runs on unmount)
    return () => {
      clearInterval(timer);
      console.log('Timer cleaned up!');
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

**Dependency Array Patterns:**

```javascript
// Runs ONCE on mount only (like componentDidMount)
useEffect(() => { 
  console.log('Mounted!');
}, []);

// Runs when 'count' changes
useEffect(() => { 
  console.log('Count changed:', count);
}, [count]);

// Runs after EVERY render (use carefully!)
useEffect(() => { 
  console.log('Component rendered');
});

// Multiple dependencies
useEffect(() => { 
  console.log('Name or email changed');
}, [name, email]);
```

---

### 3. useRef - DOM References & Persistent Values 📍

Access DOM elements directly or store mutable values that don't trigger re-renders.

#### Use Case 1: DOM Manipulation

```javascript
import { useRef } from 'react';

function FocusInput() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    // Direct DOM access
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = 'yellow';
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Click button to focus me" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
```

#### Use Case 2: Persist Values Without Re-rendering

```javascript
function TrackClicks() {
  const clickCount = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  const handleClick = () => {
    clickCount.current += 1;
    console.log('Total clicks:', clickCount.current);
    // Note: Updating ref does NOT trigger re-render
  };

  const forceRender = () => {
    setRenderCount(renderCount + 1); // This WILL re-render
  };

  return (
    <div>
      <p>Render count: {renderCount}</p>
      <p>Clicks tracked: {clickCount.current}</p>
      <button onClick={handleClick}>Track Click (no re-render)</button>
      <button onClick={forceRender}>Force Re-render</button>
    </div>
  );
}
```

**useState vs useRef:**

| Feature | useState | useRef |
|---------|----------|--------|
| Triggers re-render | ✅ Yes | ❌ No |
| Persists across renders | ✅ Yes | ✅ Yes |
| DOM access | ❌ No | ✅ Yes |
| Best for | UI data that changes | Timers, counters, DOM refs |
| Update method | Setter function | Direct `.current` assignment |

---

### 4. useMemo - Memoize Computed Values 💾

Caches expensive calculations and only recalculates when dependencies change.

```javascript
import { useState, useMemo } from 'react';

// Expensive calculation simulation
const calculateExpensiveValue = (num) => {
  console.log('Calculating...');
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += num;
  }
  return result;
};

function Calculator() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ Without useMemo: Runs on EVERY render (even when typing in input)
  // const expensiveResult = calculateExpensiveValue(count);

  // ✅ With useMemo: Only recalculates when 'count' changes
  const expensiveResult = useMemo(() => {
    return calculateExpensiveValue(count);
  }, [count]);

  return (
    <div>
      <h2>Result: {expensiveResult}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment Count ({count})
      </button>
      
      {/* Typing here won't trigger expensive calculation */}
      <input 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here (no recalculation)..."
      />
    </div>
  );
}
```

**When to use useMemo:**
- ✅ Expensive calculations
- ✅ Preventing unnecessary recalculations
- ✅ Optimizing child component re-renders (when passing objects/arrays)
- ❌ Don't overuse for simple operations (overhead not worth it)

---

### 5. useCallback - Memoize Functions 🔗

Prevents function recreation on every render, useful for optimization.

```javascript
import { useState, useEffect, useCallback } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // ❌ Without useCallback: New function created on every render
  // This causes useEffect to run unnecessarily
  // const fetchResults = () => {
  //   fetch(`/api/search?q=${query}`)
  //     .then(res => res.json())
  //     .then(data => setResults(data));
  // };

  // ✅ With useCallback: Same function reference unless 'query' changes
  const fetchResults = useCallback(() => {
    if (!query) return;
    
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, [query]); // Only recreate when query changes

  // This effect won't run unnecessarily now
  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**useMemo vs useCallback:**

```javascript
// useMemo returns a memoized VALUE
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback returns a memoized FUNCTION
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);

// These are equivalent:
useCallback(fn, deps) === useMemo(() => fn, deps)
```

---

### 6. useReducer - Complex State Management 🔧

Alternative to useState for complex state logic. Centralizes state updates in a reducer function.

```javascript
import { useReducer } from 'react';

// 1. Define reducer function (state update logic)
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_AGE':
      return { ...state, age: action.payload };
    case 'RESET':
      return { name: '', email: '', age: 0 };
    default:
      return state;
  }
};

// 2. Component using useReducer
function UserForm() {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    email: '',
    age: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', state);
    dispatch({ type: 'RESET' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.name}
        onChange={(e) => dispatch({ 
          type: 'SET_NAME', 
          payload: e.target.value 
        })}
        placeholder="Name"
      />
      
      <input
        value={state.email}
        onChange={(e) => dispatch({ 
          type: 'SET_EMAIL', 
          payload: e.target.value 
        })}
        placeholder="Email"
      />
      
      <input
        type="number"
        value={state.age}
        onChange={(e) => dispatch({ 
          type: 'SET_AGE', 
          payload: parseInt(e.target.value) || 0
        })}
        placeholder="Age"
      />
      
      <button type="submit">Submit</button>
      <button type="button" onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
    </form>
  );
}
```

**When to use useReducer vs useState:**

| Use useState when: | Use useReducer when: |
|-------------------|---------------------|
| Simple state (1-2 values) | Complex state objects with multiple fields |
| Independent state updates | Related state transitions |
| Basic toggle/increment | Multiple ways to update state |
| No complex logic | Need predictable state updates |
| Starting out | Scaling up complexity |

---

### 7. useContext - Access Global State 🌐

Provides access to context values without prop drilling.

```javascript
import { createContext, useContext, useState } from 'react';

// 1. Create context
const AuthContext = createContext();

// 2. Create provider component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook for easy access
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// 4. Use in components
function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// 5. Wrap app with provider
function App() {
  return (
    <AuthProvider>
      <UserProfile />
    </AuthProvider>
  );
}
```

---

## Component Lifecycle

### Functional Component Lifecycle (Modern) 🔄

```javascript
import { useEffect } from 'react';

function MyComponent() {
  // 1. MOUNTING + UPDATING (runs on every render)
  useEffect(() => {
    console.log('Component rendered');
  });

  // 2. MOUNTING ONLY (runs once when component appears)
  useEffect(() => {
    console.log('Component mounted');
    
    // 3. UNMOUNTING (cleanup - runs when component disappears)
    return () => {
      console.log('Component will unmount');
    };
  }, []); // Empty array = run once

  // 4. CONDITIONAL UPDATES (runs when dependency changes)
  useEffect(() => {
    console.log('Dependency changed');
  }, [dependency]);

  return <div>My Component</div>;
}
```

### Lifecycle Visualization

```
Mount → Update → Update → Update → Unmount
  ↓       ↓        ↓        ↓         ↓
 📍      🔄      🔄       🔄       🧹
 Setup  Change   Change   Change   Cleanup
```

---

## Props & Props Drilling

### Understanding Props 📦

Props (properties) pass data from parent to child components. They are **read-only** and **immutable**.

```javascript
// Parent component
function App() {
  const userData = { name: 'Alice', age: 25 };
  
  return <UserCard user={userData} theme="dark" />;
}

// Child component
function UserCard({ user, theme }) {
  // Props are read-only - cannot modify them
  return (
    <div className={theme}>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
    </div>
  );
}
```

### Props Drilling Problem 😫

Passing props through multiple levels becomes tedious:

```javascript
// ❌ Props Drilling - Tedious and error-prone
function App() {
  const user = { name: 'Alice' };
  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Sidebar user={user} />; // Just passing through
}

function Sidebar({ user }) {
  return <UserMenu user={user} />; // Just passing through
}

function UserMenu({ user }) {
  return <UserProfile user={user} />; // Just passing through
}

function UserProfile({ user }) {
  return <h1>{user.name}</h1>; // Finally used here!
}
```

### Solution: Context API ✅

```javascript
// ✅ Using Context - Clean and direct
const UserContext = createContext();

function App() {
  const user = { name: 'Alice' };
  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}

// No need to pass props through intermediate components!
function Dashboard() {
  return <Sidebar />;
}

function Sidebar() {
  return <UserMenu />;
}

function UserMenu() {
  return <UserProfile />;
}

function UserProfile() {
  const user = useContext(UserContext); // Direct access!
  return <h1>{user.name}</h1>;
}
```

---

## Context API

### Creating Multiple Contexts

```javascript
// contexts/ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Using Multiple Contexts

```javascript
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </AuthProvider>
  );
}
```

---

## Routing

### Basic React Router Setup 🗺️

```bash
npm install react-router-dom
```

```javascript
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link,
  Navigate 
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
```

### Dynamic Routes & Parameters

```javascript
import { useParams, useNavigate } from 'react-router-dom';

// Define route with parameter
<Route path="/user/:userId" element={<UserProfile />} />

// Access parameter in component
function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back one page
  };

  const goToHome = () => {
    navigate('/'); // Navigate to home
  };

  return (
    <div>
      <h1>User ID: {userId}</h1>
      <button onClick={goBack}>Go Back</button>
      <button onClick={goToHome}>Home</button>
    </div>
  );
}
```

### Protected Routes 🔒

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

---

## Best Practices

### 1. Component Organization 📁

```javascript
// ✅ Good: Single responsibility
function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// ❌ Bad: Too many responsibilities
function MegaComponent() {
  // 200+ lines of mixed logic, styles, and rendering
  // Hard to maintain and test
}
```

### 2. State Management Guidelines 🎯

```javascript
// ✅ Lift state up when shared between components
function Parent() {
  const [sharedData, setSharedData] = useState('');
  
  return (
    <>
      <ChildA data={sharedData} setData={setSharedData} />
      <ChildB data={sharedData} />
    </>
  );
}

// ✅ Keep state local when only used in one component
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 3. Key Props in Lists 🔑

```javascript
// ✅ Good: Unique, stable keys
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// ❌ Bad: Index as key (can cause bugs with reordering/filtering)
{users.map((user, index) => (
  <UserCard key={index} user={user} />
))}
```

### 4. Conditional Rendering 🔀

```javascript
// ✅ Good: Clean and readable
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data ? <DataDisplay data={data} /> : <EmptyState />}

// ❌ Bad: Nested ternaries (hard to read)
{isLoading ? <Spinner /> : error ? <Error /> : data ? <Data /> : null}
```

### 5. Effect Cleanup 🧹

```javascript
useEffect(() => {
  const subscription = subscribeToData();
  const timer = setInterval(() => {
    console.log('Running...');
  }, 1000);

  // ✅ Always clean up to prevent memory leaks
  return () => {
    subscription.unsubscribe();
    clearInterval(timer);
  };
}, []);
```

---

## Useful Tools & Extensions

### VS Code Extensions 🛠️

1. **ES7+ React/Redux/React-Native Snippets**
   - `rfc` → Functional component
   - `rfce` → Functional component with export
   - `useState` → useState hook
   - `useEffect` → useEffect hook

2. **ESLint** - Code quality & error detection
3. **Prettier** - Automatic code formatting
4. **Auto Rename Tag** - Sync HTML/JSX tag editing

### Browser Extensions 🌐

- **React Developer Tools** - Inspect component tree, props, state
- **Redux DevTools** - Debug Redux state (if using Redux)

---

## Common Interview Questions

### 1. What is the Virtual DOM?

The Virtual DOM is a lightweight copy of the actual DOM. React uses it to:
- Calculate minimum changes needed (diffing)
- Batch updates for better performance
- Update only what changed

### 2. What are React Keys and why are they important?

Keys help React identify which items in a list have changed, been added, or removed. They should be:
- Unique among siblings
- Stable across re-renders
- Not array indices (unless list never reorders)

```javascript
// ✅ Good - using unique ID
items.map(item => <Item key={item.id} {...item} />)

// ❌ Bad - using index (causes bugs when list changes)
items.map((item, index) => <Item key={index} {...item} />)
```

### 3. What is prop drilling and how to avoid it?

**Prop drilling** is passing props through multiple component levels to reach a deeply nested component.

**Solutions:**
- Context API for global state
- Component composition
- State management libraries (Redux, Zustand, Recoil)

### 4. When to use useState vs useReducer?

| Use useState when: | Use useReducer when: |
|-------------------|---------------------|
| Simple state (1-2 values) | Complex state objects |
| Few updates | Multiple related updates |
| Independent values | Predictable state transitions |
| Starting simple | Scaling complexity |

### 5. What are side effects in React?

Side effects are operations that affect things outside the component:
- API calls / Data fetching
- DOM manipulation
- Subscriptions (WebSocket, etc.)
- Timers (setTimeout, setInterval)
- Logging

**Handle with `useEffect` hook.**

### 6. Difference between controlled and uncontrolled components?

**Controlled Component:** Form data handled by React state
```javascript
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />
```

**Uncontrolled Component:** Form data handled by DOM itself
```javascript
const inputRef = useRef();
<input ref={inputRef} />
// Access with: inputRef.current.value
```

### 7. What is lifting state up?

Moving state to the nearest common ancestor when multiple components need to share it.

```javascript
function Parent() {
  const [data, setData] = useState('');
  
  return (
    <>
      <ChildA data={data} setData={setData} />
      <ChildB data={data} />
    </>
  );
}
```

### 8. What is React.memo and when should you use it?

`React.memo` is a higher-order component that prevents unnecessary re-renders by memoizing the result.

```javascript
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Rendering...');
  return <div>{data}</div>;
});

// Only re-renders when 'data' prop changes
```

---

## Troubleshooting

### 1. "Too many re-renders" Error ♾️

**Cause:** Setting state during render creates infinite loop

```javascript
// ❌ Wrong - infinite loop!
function Component() {
  const [count, setCount] = useState(0);
  setCount(count + 1); // Called during render
  return <div>{count}</div>;
}

// ✅ Correct - use useEffect
function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    setCount(count + 1);
  }, []); // Runs once on mount
  
  return <div>{count}</div>;
}

// ✅ Or use event handler
function Component() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### 2. "Can't perform a React state update on an unmounted component" ⚠️

**Cause:** Setting state after component unmounts

```javascript
// ✅ Solution: Track mount status
useEffect(() => {
  let isMounted = true;

  fetchData().then(data => {
    if (isMounted) {
      setData(data);
    }
  });

  return () => {
    isMounted = false; // Cleanup
  };
}, []);
```

### 3. "Objects are not valid as a React child" 🚫

**Cause:** Trying to render an object directly

```javascript
const user = { name: 'John', age: 30 };

// ❌ Wrong - can't render objects
return <div>{user}</div>;

// ✅ Correct - render specific properties
return <div>{user.name}</div>;

// ✅ Or stringify for debugging
return <div>{JSON.stringify(user)}</div>;
```

### 4. Missing Dependencies Warning in useEffect ⚠️

```javascript
// ⚠️ Warning: missing 'count' in dependencies
useEffect(() => {
  console.log(count);
}, []);

// ✅ Correct - include all used values
useEffect(() => {
  console.log(count);
}, [count]);

// ✅ Or use ESLint plugin to auto-fix
// npm install eslint-plugin-react-hooks
```

### 5. State Not Updating Immediately 🕐

**Remember:** State updates are asynchronous!

```javascript
function Component() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // ❌ Still shows old value!
    
    // ✅ Use useEffect to see new value
    // Or use functional update
    setCount(prev => {
      console.log('New value:', prev + 1);
      return prev + 1;
    });
  };
  
  return <button onClick={handleClick}>{count}</button>;
}
```

---

## Advanced Patterns

### Custom Hooks 🎣

Create reusable logic by extracting it into custom hooks:

```javascript
// useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input 
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Your name (saved to localStorage)"
    />
  );
}
```

### useDebounce Hook ⏱️

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage in search
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call only after user stops typing for 500ms
      console.log('Searching for:', debouncedSearchTerm);
      fetch(`/api/search?q=${debouncedSearchTerm}`)
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search... (debounced)"
    />
  );
}
```

### useFetch Hook 🌐

```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response failed');
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Performance Optimization

### 1. Code Splitting with React.lazy 📦

```javascript
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

### 2. Memoization with React.memo 💾

```javascript
// Component only re-renders if props change
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('Rendering ExpensiveComponent');
  return (
    <div>
      <h2>{data.title}</h2>
      <button onClick={onUpdate}>Update</button>
    </div>
  );
});

// With custom comparison
const OptimizedComponent = React.memo(
  ({ data }) => <div>{data.name}</div>,
  (prevProps, nextProps) => {
    // Return true if props are equal (skip render)
    return prevProps.data.id === nextProps.data.id;
  }
);
```

### 3. Avoid Inline Functions 🎯

```javascript
// ❌ Bad: Creates new function on every render
function List({ items }) {
  return items.map(item => (
    <Item 
      key={item.id} 
      onClick={() => handleClick(item.id)} 
    />
  ));
}

// ✅ Better: Memoized callback
function List({ items }) {
  const handleClick = useCallback((id) => {
    console.log('Clicked:', id);
  }, []);
  
  return items.map(item => (
    <Item 
      key={item.id} 
      onClick={() => handleClick(item.id)} 
    />
  ));
}
```

---

## Quick Reference

### Common Patterns 📚

```javascript
// Controlled input
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />

// Checkbox
const [checked, setChecked] = useState(false);
<input 
  type="checkbox" 
  checked={checked} 
  onChange={e => setChecked(e.target.checked)} 
/>

// Select dropdown
const [selected, setSelected] = useState('');
<select value={selected} onChange={e => setSelected(e.target.value)}>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>

// Form submission
const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form data
};

// Async data fetching
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  };
  fetchData();
}, []);

// Toggle boolean state
const [isOpen, setIsOpen] = useState(false);
<button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
// Or better:
<button onClick={() => setIsOpen(prev => !prev)}>Toggle</button>
```

### Common Gotchas ⚠️

**❌ Don't:**
```javascript
// Call hooks conditionally
if (condition) {
  const [state, setState] = useState(0); // ❌ Error!
}

// Call hooks in loops
for (let i = 0; i < 10; i++) {
  useEffect(() => {}); // ❌ Error!
}

// Mutate state directly
state.value = 10; // ❌ Won't trigger re-render
arr.push(item); // ❌ Mutates array
obj.name = 'John'; // ❌ Mutates object

// Forget dependencies in useEffect
useEffect(() => {
  console.log(count); // Uses count
}, []); // ❌ Missing dependency!
```

**✅ Do:**
```javascript
// Always call hooks at top level
const [state, setState] = useState(0);

// Use conditional rendering, not conditional hooks
const [state, setState] = useState(0);
if (condition) {
  // Use state here
}

// Use setter functions
setState(10);

// Use spread operator for objects/arrays
setState({ ...state, value: 10 });
setArray([...array, newItem]);

// Include all dependencies
useEffect(() => {
  console.log(count);
}, [count]); // ✅ All dependencies included
```

---

## Deployment 🚀

### Build for Production

```bash
# Create React App
npm run build

# Vite
npm run build

# Preview production build locally
npm run preview  # Vite
# or
npx serve -s build  # CRA
```

### Environment Variables

```bash
# .env file (root directory)
REACT_APP_API_URL=https://api.example.com
REACT_APP_API_KEY=your_key_here

# For Vite, use VITE_ prefix
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_key_here
```

```javascript
// Usage in code
// CRA
const apiUrl = process.env.REACT_APP_API_URL;

// Vite
const apiUrl = import.meta.env.VITE_API_URL;
```

### Deployment Platforms

**1. Vercel (Recommended) ⚡**
```bash
npm install -g vercel
vercel
```

**2. Netlify 🌐**
```bash
# Drag and drop 'build' folder to netlify.com
# Or use CLI:
npm install netlify-cli -g
netlify deploy
```

**3. GitHub Pages 📄**
```bash
npm install gh-pages --save-dev

# Add to package.json:
"homepage": "https://yourusername.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

---

## Summary Checklist ✅

### Before Writing Code
- [ ] Plan component structure
- [ ] Identify shared state
- [ ] Consider prop drilling issues
- [ ] Plan routing structure

### While Writing Code
- [ ] Use meaningful component and variable names
- [ ] Keep components small and focused (single responsibility)
- [ ] Add proper keys to lists
- [ ] Handle loading, error, and empty states
- [ ] Clean up effects properly
- [ ] Don't mutate state directly
- [ ] Include all dependencies in useEffect

### Before Deployment
- [ ] Remove console.logs and debugging code
- [ ] Test all features thoroughly
- [ ] Check responsive design (mobile, tablet, desktop)
- [ ] Optimize images and assets
- [ ] Set up environment variables
- [ ] Test production build locally
- [ ] Check for accessibility issues
- [ ] Review performance (React DevTools Profiler)

---

## Learning Path 🎓

### Beginner (Weeks 1-2)
1. ✅ Understand components and JSX
2. ✅ Master useState
3. ✅ Learn props and conditional rendering
4. ✅ Practice with lists and keys
5. ✅ Build simple projects (Todo app, Counter)

### Intermediate (Weeks 3-4)
1. ✅ Master useEffect and lifecycle
2. ✅ Understand useRef and useContext
3. ✅ Learn React Router
4. ✅ Handle forms and validation
5. ✅ Fetch data from APIs
6. ✅ Build medium projects (Weather app, Blog)

### Advanced (Weeks 5+)
1. ✅ useMemo, useCallback, and optimization
2. ✅ Custom hooks
3. ✅ Context API patterns
4. ✅ Testing (Jest, React Testing Library)
5. ✅ State management (Redux, Zustand)
6. ✅ Build complex projects (E-commerce, Dashboard)

---

## Additional Resources 📚

### Official Documentation
- [React Official Docs](https://react.dev) - Best place to start
- [React Router Docs](https://reactrouter.com)
- [Create React App Docs](https://create-react-app.dev)
- [Vite Docs](https://vitejs.dev)

### Learning Platforms
- [React Documentation Tutorial](https://react.dev/learn)
- [FreeCodeCamp React Course](https://www.freecodecamp.org)
- [Scrimba React Course](https://scrimba.com/learn/learnreact)
- [Egghead.io React Courses](https://egghead.io/q/react)

### Community & Help
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- [Reddit r/reactjs](https://reddit.com/r/reactjs)
- [React Discord Community](https://discord.gg/react)
- [Dev.to React Tag](https://dev.to/t/react)

### Useful Libraries
```bash
# State Management
npm install zustand          # Simple state management
npm install @reduxjs/toolkit # Redux (complex apps)

# Data Fetching
npm install @tanstack/react-query  # Powerful data fetching
npm install axios                   # HTTP client

# Form Handling
npm install react-hook-form   # Performant forms
npm install formik            # Popular form library

# UI Components
npm install @mui/material     # Material-UI
npm install antd              # Ant Design
npm install chakra-ui         # Chakra UI

# Styling
npm install styled-components # CSS-in-JS
npm install tailwindcss       # Utility-first CSS
```

---

## Final Tips 💡

1. **Start Simple** - Don't over-engineer early. Build, then refactor
2. **Read Error Messages** - They're usually very helpful in React
3. **Use React DevTools** - Inspect components, state, and performance
4. **Practice Regularly** - Build small projects frequently
5. **Read Official Docs** - They're excellent and always up-to-date
6. **Join Communities** - Ask questions, help others, learn together
7. **Code Reviews** - Learn from others' code on GitHub
8. **Write Tests** - Catch bugs early and document behavior
9. **Stay Updated** - React evolves, follow official blog and changelog
10. **Have Fun!** - Enjoy the journey of learning React! 🎉

---

## Quick Command Reference

```bash
# Create new React app
npx create-react-app my-app
npm create vite@latest my-app -- --template react

# Development
npm start        # CRA
npm run dev      # Vite

# Production build
npm run build

# Install packages
npm install package-name
npm install -D package-name  # Dev dependency

# React Router
npm install react-router-dom

# Common tools
npm install axios
npm install @tanstack/react-query
npm install react-hook-form
```

---

**Made with ❤️ for React Developers**

*Last Updated: 2025*

**Remember:** The best way to learn React is by building projects! Start small, practice consistently, and gradually take on more complex challenges. Happy coding! 🚀

---

### Practice Project Ideas 💻

**Beginner:**
- Counter app with increment/decrement
- Todo list with add/delete/toggle
- Simple weather app
- Random quote generator

**Intermediate:**
- Blog with routing and API
- E-commerce product listing
- Movie search app (TMDB API)
- Authentication flow with context

**Advanced:**
- Full-stack dashboard with charts
- Real-time chat application
- Social media clone
- Project management tool

Start building today! 🎯