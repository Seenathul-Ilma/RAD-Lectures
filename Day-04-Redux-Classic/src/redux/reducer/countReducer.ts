import { createReducer, type PayloadAction } from "@reduxjs/toolkit"
import { decrementing, incrementing, valueSetting } from "../action/counterAction"


// initialState provides the default state for this reducer when the store is created (or when state is undefined).
const initialState = {
    initCount: 0 
}

// Key difference
// Toolkit → lets you pretend to mutate (state.initCount += 1) because Immer makes a safe immutable copy.
// Classic Redux → you must manually copy the old state and return a new object ({ ...state, initCount: ... }).

// 🔹 Your Redux Toolkit version (with createReducer)
// createReducer uses Immer behind the scenes: you can mutate currentState directly in the callback, but Immer produces an immutable next-state under the hood. 
// That’s why currentState.initCount += 1 is allowed and safe.
export const counterReducer = createReducer(initialState, (builder) => {
    builder.addCase(incrementing, (currentState: any) => {    // builder.addCase(actionCreator, caseReducer) maps a specific action type to its handler. This is the typed alternative to switch(action.type).
        // ✅ looks like mutation, safe with Immer
        currentState.initCount += 1 
    })

    /*
    builder.addCase(incrementing, (state) => {
        // ❌ Classic Redux: not allowed
        // state.initCount += 1   (directly mutates original state)

        // ✅ Classic Redux way:
        // return { ...state, initCount: state.initCount + 1 }

        // ✅ Redux Toolkit way (with Immer):
        // we can "mutate" draft
        state.initCount += 1

        // Immer secretly turns it into:
        // return {
            //  ...state, 
            // initCount: state.initCount + 1 
        // }
    })
    */

    .addCase(decrementing, (currentState: any) => {
        currentState.initCount -= 1 
    })
    .addCase(valueSetting, (currentState:any, counterAction:PayloadAction<number>) => {  // PayloadAction<number> types the action parameter so action.payload is recognized as a number.
        currentState.initCount = counterAction.payload 
    })
})


/*
🔹 Equivalent Classic Redux version

const initialState = { initCount: 0 }

export function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case "counter/incrementing":
      return {
        ...state,                     // copy old state
        initCount: state.initCount + 1
      }

    case "counter/decrementing":
      return {
        ...state,
        initCount: state.initCount - 1
      }

    case "counter/valueSetting":
      return {
        ...state,
        initCount: action.payload     // update with payload
      }

    default:
      return state
  }
}
*/


// Why this counterReducer 
// You define a reducer that knows how to update part of the state when those actions happen. (counterReducer)


// Mutate (in programming) To mutate means to change or modify something directly in memory — without creating a new copy. 
// Think: change the original object itself. 
// Redux requires immutability (no mutation) because: It helps track changes (important for debugging/time-travel DevTools). 
// It avoids bugs when components rely on state not unexpectedly changing. 
// It makes comparing old vs new state easy (=== reference check). 
// So in classic Redux, you must never mutate: 
    // ❌ BAD: mutation state.count++ 
    // ✅ GOOD: new object return { ...state, count: state.count + 1 } 
// Why Redux Toolkit lets you “mutate” With Redux Toolkit, thanks to Immer, you can write code that looks like mutation: 
    // state.count++ But Immer secretly produces a new immutable object behind the scenes. 
// So you get the simplicity of mutation, with the safety of immutability. 
// ✅ In short: Mutate = directly changing the original variable/object/array. 
// Non-mutate = making a new copy with the change, leaving the original untouched.

// Normally in Redux Reducers must be pure functions that don’t mutate the existing state. 
// That means you can’t do: 
// function counterReducer(state, action) {
    // ❌ Mutation (not allowed in classic Redux) 
    // state.count = state.count + 1  // directly modifies state object
    // return state    // same object returned
// }

// Because this directly mutates the state object. 
// Redux expects immutability: always return a new object. 
// So in classic Redux you would write:
// function counterReducer(state, action) {
    // ✅ return a new copy  // // What Immer produces internally
    // return {
        // ...state,                  // copy old state
        // count: state.count + 1     // update count
    // } 
// }

// What Immer does (used by Redux Toolkit createReducer and createSlice) ?
// Immer is a library that wraps your reducer logic and gives you a draft state (a proxy object). 
// When you do state.initCount += 1, Immer records the change.
// Inside your reducer callback, the state you receive is not the real state.
// After the callback, Immer builds a new immutable object. 
// It’s a draft proxy created by Immer.

// You can “mutate” it as if it’s mutable (state.count++, state.name = "Ilma"). 
// After your callback finishes, Immer automatically builds a brand-new immutable state behind the scenes. 
// So when you write: 
// builder.addCase(incrementing, (state) => {
//  state.initCount += 1 
// })

// What happens internally is:
// Immer intercepts state.initCount += 1. 
// It records that “initCount changed from X to X+1”. 
// It produces a new object: 
    // return { initCount: oldState.initCount + 1 } 
// Redux receives this new immutable state.


// That’s why state.initCount += 1 looks like mutation, but the real state object is never mutated — you always get a new immutable copy. 
// Visual example :- 
// Suppose your state was: { initCount: 5 } 
// Reducer code: (state) => { state.initCount += 1 } 
// You think you mutated the same object. 
// But Immer actually returns: { initCount: 6 } 
// The old { initCount: 5 } is still untouched (immutable guarantee). 
// ✅ That’s why Redux Toolkit allows state.initCount += 1.
// So Redux’s time-travel debugging, equality checks, and immutability rules still work. 

// ✅ Summary: With createReducer (and createSlice), the state argument is a draft from Immer. 
// You can pretend to mutate it directly, but Immer generates a new immutable state object behind the scenes. 
// That’s why state.initCount += 1 is “safe” in Redux Toolkit. 