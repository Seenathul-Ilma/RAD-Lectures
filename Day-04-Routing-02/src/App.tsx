/*
 REACT ROUTING → PART 02 (ADVANCED / CONFIGURATION-BASED ROUTING)
=================================================================
 Concept
------------------------------------------------------
Programmatic Routing:
→ Routes are defined as plain JS/TS objects instead of JSX.
→ Introduced in React Router v6.4+.
→ Enables modern, data-driven features like:
   - Loaders & Actions (fetch data or submit forms directly in routes)
   - Error Boundaries (handle per-route errors)
   - Deferred Loading (stream data in parts)
   - Lazy Loading (easily split code by route)

 When to Use
------------------------------------------------------
→ Larger, scalable apps.
→ You plan to use loaders, form actions, or error handling.
→ You prefer having a centralized route config array.
→ You want to separate route definitions from components.
*/

// React Routing → Part 02 (Advanced / Configuration-based Routing)
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Layout from './components/Layout'
import Default from './pages/Default'
import Home from './pages/Home'
import About from './pages/About'

// 1. Define all routes as JS/TS objects instead of JSX/TSX
//  - This object-based style was introduced in React Router v6.4+
//  - It allows using advanced features like loaders, actions, error boundaries, etc.
const router = createBrowserRouter([
  {
    path: "/login",            // Direct route (no layout)
    element: <Login />         // Component to render
  },
  {
    path: "/contact/:id",      // Dynamic route with parameter (:id)
    element: <Contact />
  },
  {
    path: "/",                 // Parent route
    element: <Layout />,       // Common layout (contains <Header> + <Outlet>)
    children: [                // Child routes (nested)
      {
        path: "/",             // Default child route ("/")
        element: <Default />
      },
      {
        path: "/home",         // Child route ("/home")
        element: <Home />
      },
      {
        path: "/about",        // Child route ("/about")
        element: <About />
      }
    ]
  }
])

// 2. Connect router to your app
// - RouterProvider replaces <BrowserRouter> in this approach
// - It takes the router object and handles navigation internally
const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App


// REACT ROUTING → PART 01 (BASIC / COMPONENT-BASED ROUTING)

/* import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Layout from './components/Layout'
import Default from './pages/Default'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Layout />}>

          <Route index element={<Default />} />

          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/contact/:id" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  )
}
 */