//import React from 'react'
import Details from './components/Details'

export default function App() {
  let username = "Ilma"


  // here we don't use class attribute as "class" like html
  // we use 'cllassName' in react instead using 'class'
  // bcz, 'class' is a reserved keyword in js.
  // so, use 'className' for css class attributes.

  // we can use inner styles here. but use camel case (backgroundColor) instead kebab case (background-color)
  // we can use external styles as usual. but in index.css we can use css as usual. (background-color)

  return (
    <>

    <Details>
      {/* This <ul> ... </ul> block will be passed to Details as props.children. Inside Details, {props.children} will render this <ul> list. */}
      {/* props.name and props.age are not passed, so they will be empty/undefine */}
      <ul>
        <li>Java</li>
        <li>Python</li>
        <li>C#</li>
      </ul>
    </Details>

    {/* we are passing two props:
          props.name = "Ilma Musawwir"
          props.age = 21
        These values will be rendered where {props.name} and {props.age} are used in the Details component.
        Since you didn’t put anything between <Details> ... </Details>, {props.children} will be empty.
    */}
    <Details name={"Ilma Musawwir"} age={21}></Details>

    <h1 style={
      {
        backgroundColor: "red",
        color: "aquamarine"
      }
    }>Hello, React..!</h1>
    <h2 className="test">This is my web application</h2>
    <h2 className="test">{username}</h2>
    <h3>Hi...</h3>
    </>
  )
}


// App.tsx -> entry point of the project