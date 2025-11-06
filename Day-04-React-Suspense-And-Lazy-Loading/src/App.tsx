/*
// REACT ROUTING → PART 03 (LAZY LOADING + SUSPENSE)
=================================================================
CONCEPT
-----------------------------------------------------------------
PERFORMANCE-ORIENTED ROUTING:
→ COMPONENTS ARE LOADED "ON DEMAND" USING REACT.LAZY().
→ WHEN A ROUTE IS VISITED, ONLY THAT COMPONENT IS DOWNLOADED.
→ WRAP LAZY COMPONENTS WITH <SUSPENSE> TO SHOW A FALLBACK (LOADER).

WHY USE IT
-----------------------------------------------------------------
→ REDUCES INITIAL BUNDLE SIZE.
→ FASTER INITIAL LOAD TIME.
→ PERFECT FOR LARGE APPLICATIONS OR MANY ROUTES.
→ COMBINES WELL WITH CREATEBROWSERROUTER (PART 02).

WHEN TO USE
-----------------------------------------------------------------
→ WHEN YOUR APP HAS MANY PAGES OR HEAVY COMPONENTS.
→ YOU WANT TO IMPROVE PERFORMANCE AND LOAD TIME.
→ YOU WANT TO CODE-SPLIT ROUTES DYNAMICALLY.
*/

// REACT ROUTING → PART 02 (ADVANCED / CONFIGURATION-BASED ROUTING) WITH (LAZY LOADING + SUSPENSE)
// ===============================================================================================
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Layout is NOT lazy-loaded because it's always rendered (main app shell)
import Layout from './components/Layout'
// Import lazy & Suspense for code-splitting (lazy loading components only when needed)
import { lazy, Suspense } from 'react'

// Lazy-load all route pages (reduces initial bundle size)
const Login = lazy(() => import('./pages/Login'))
const Default = lazy(() => import('./pages/Default'))
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

const router = createBrowserRouter([
  {
    path: "/login",            
    element: <Login />         
  },
  {
    path: "/contact/:id",      
    element: <Contact />
  },
  {
    path: "/",                
    element: <Layout />,       
    children: [                
      {
        path: "/",             
        element: <Default />
      },
      {
        path: "/home",         
        element: <Home />
      },
      {
        path: "/about",
        element: <About />        
      }
    ]
  }
])

// Root component
const App = () => {
  return (
    // Suspense shows fallback (Loading...) until lazy components finish loading (like a spinner or text) instead.”
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
    // <Suspense> is a React component used to pause the rendering of part of your UI until some data or component is ready — typically 
    // used with lazy-loaded components or data fetching (React 18+).

    // If you remove <Suspense> and try to use lazy imports:
    // You’ll get an error like: 'Error: A component suspended while rendering, but no fallback UI was specified.'
    // Because React doesn’t know what to render while the lazy component loads.
  )
}

export default App


// REACT ROUTING → PART 01 (BASIC / COMPONENT-BASED ROUTING) WITH (LAZY LOADING + SUSPENSE)
// ========================================================================================
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
// import Layout from "./components/Layout"
// import { lazy, Suspense } from "react"

// const Home = lazy(() => import("./pages/Home"))
// const About = lazy(() => import("./pages/About"))
// const Contact = lazy(() => import("./pages/Contact"))
// const Login = lazy(() => import("./pages/Login"))

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/" element={<Layout />}>
//             <Route index element={<Home />} />
//             <Route path="about" element={<About />} />
//             <Route path="contact/:id" element={<Contact />} />
//           </Route>

//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   )
// }

// export default App