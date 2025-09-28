//import React from 'react'

// This is a reusable component called 'Details'.
// It accepts props (properties) that are passed down from the parent component ('App').
export default function Details(props: any) {
  return (
    <div>
        <h1>This is the detail component</h1>

        {/* 
          'props.children' is a special prop. 
          It represents anything you put between <Details> ... </Details> 
          in the parent component.
        */}
        {props.children}

        {/* Custom props passed by parent */}
        <h5>{props.name}</h5>
        <h5>{props.age}</h5>
    </div>
  )
}
