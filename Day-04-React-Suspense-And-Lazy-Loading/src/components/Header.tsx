import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav 
        style={{
            display: "flex",
            justifyContent: "space-around"
        }}
    >

        {/* <Link> is used instead of <a> to change the route without page reload */}
        {/*     It automatically updates the URL and shows the correct component */}
        <Link to="/">Default</Link>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
    </nav>
  )
}
