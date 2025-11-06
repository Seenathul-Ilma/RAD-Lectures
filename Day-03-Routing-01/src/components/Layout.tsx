import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        {/* Common layout part (e.g., header or sidebar) */}
        <Header />

        <main>
            {/* <Outlet /> acts as a placeholder for nested routes */}
            {/*     Whatever route is matched inside <Layout> will render here */}
            {/*     For example, <Default />, <Home />, or <About /> */}
            <Outlet />
        </main>
    </div>
  )
}
