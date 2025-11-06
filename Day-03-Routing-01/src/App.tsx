/*
 REACT ROUTING → PART 01 (BASIC / COMPONENT-BASED ROUTING)
=================================================================
 Concept
------------------------------------------------------
Declarative Routing:
→ Routes are defined as JSX elements inside the component tree.
→ Works like defining UI — each <Route> is nested inside <Routes> just like other React components.
→ Ideal for small or medium-sized projects and quick setups.

 When to Use
------------------------------------------------------
→ Simple routing setups.
→ You want to keep all routes directly inside App.tsx.
→ You don’t need loaders, actions, or lazy data fetching.
→ Great for learning or small demos.
*/


import React from 'react'
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
    // BrowserRouter provides the routing context for your app
    //     It keeps the UI in sync with the URL
    <BrowserRouter>

      {/* commented since we use Header inside the layout (Header + Main Part) */}
      {/* <Header /> */}

      {/* All route configurations go inside <Routes> */}
      <Routes>

        {/* =============== Layout-based routes =============== */}
        {/* The path="/" route uses Layout as its wrapper */}
        {/* Inside Layout, <Outlet /> will render child routes */}
        <Route path="/" element={<Layout />}>

          {/* index route → shown when path = "/" exactly */}
          <Route index element={<Default />} />

          {/* Nested routes that use Layout too */}
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* =============== Independent routes (no Layout) =============== */}
        {/* This route doesn't use Layout component */}
        <Route path="/login" element={<Login />} />

        {/* Dynamic route with URL parameter (:id) */}
        {/*     Example URL: /contact/123 → id = "123" */}
        <Route path="/contact/:id" element={<Contact />} />

      </Routes>

    </BrowserRouter>
  )
}


/*

Flow summery

1. BrowserRouter wraps your entire app — it listens to URL changes.

2. Routes contains all route definitions.

3. Route with element={<Layout />} acts as a wrapper (shared layout).

4. Inside Layout, <Outlet /> dynamically renders the matched child route (Default, Home, or About).

5. The Contact route uses a dynamic parameter :id, and useParams() reads that value.

6. Header provides navigation using <Link> — these update the URL without reloading the page.

*/
