//import React from 'react';
import { Component } from 'react'

/* export default class ClassComponent extends Component {

    componentDidMount() {
        console.log("Component mountings catch here..")
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot?: any): void {
        console.log(prevProps, prevState)
    }

    componentWillUnmount() {
        console.log("Removing component catch here..")
    }

  render() {
    return (
      <div>
        <h1>I'm the Class Component</h1>
      </div>
    )
  }
} */


export default class ClassComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
    console.log("1️⃣ constructor()");
  }

  static getDerivedStateFromProps(props: any, state: any) {
    console.log("2️⃣ getDerivedStateFromProps()");
    return null;
  }

  componentDidMount() {
    console.log("4️⃣ componentDidMount()");
  }

  shouldComponentUpdate() {
    console.log("🌀 shouldComponentUpdate()");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log("📸 getSnapshotBeforeUpdate()");
    console.log(prevProps, prevState)
    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any, snapshot: any): void {
    console.log("✅ componentDidUpdate()");
    console.log(prevProps, prevState, snapshot)
  }

  componentWillUnmount() {
    console.log("💀 componentWillUnmount()");
  }

  render() {
    console.log("3️⃣ render()");
    return (
      <div>
        <h1>I'm the Class Component</h1>
        <h2>Count: {this.state.count}</h2>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}


// What is a Component Lifecycle?
// The lifecycle of a React component refers to the stages a component goes through from the moment it is created (mounted) to the time it is removed (unmounted) from the DOM.

// There are three main phases:
//  - Mounting : Component is created and inserted into the DOM.
//  - Updating : Component’s state or props change, causing a re-render.
//  - Unmounting : Component is removed from the DOM.

// 1. Class Component Lifecycle

/* 
import React, { Component } from "react";

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { count: 0 };
    console.log("1️⃣ constructor()");
  }

  static getDerivedStateFromProps(props: any, state: any) {
    console.log("2️⃣ getDerivedStateFromProps()");
    return null;
  }

  componentDidMount() {
    console.log("4️⃣ componentDidMount()");
  }

  shouldComponentUpdate() {
    console.log("🌀 shouldComponentUpdate()");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    console.log("📸 getSnapshotBeforeUpdate()");
    return null;
  }

  componentDidUpdate() {
    console.log("✅ componentDidUpdate()");
  }

  componentWillUnmount() {
    console.log("💀 componentWillUnmount()");
  }

  render() {
    console.log("3️⃣ render()");
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default App; 
*/