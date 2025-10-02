import { createAction } from "@reduxjs/toolkit";



// export const incriment = createAction("counter/incriment")

// createAction returns a typed action creator. The string is the action type. Using "sliceName/actionName" is a convention that avoids collisions.
export const incrementing = createAction("myCounter/myIncrement")
// or, function incrementing() { return { type: "counter/incrementing" }}

export const decrementing = createAction("myCounter/myDecrement")

// createAction<number>(...) types the payload as number, so TypeScript knows valueSetting(5) has a number payload.
export const valueSetting = createAction<number>("myCounter/mySetValue")
// or, function valueSetting(value: number) { return { type: "counter/valueSetting", payload: value }}


// why this action functions ?
// You define actions (action creators) → incrementing, decrementing, valueSetting.

// In classic Redux, you still need actions — you can’t skip them. ✅

// 1️⃣ What an action is
// An action is a plain object that describes what happened in your app.
// It must have a type property (string) and optionally a payload.

// 2️⃣ Why actions are needed in classic Redux and Toolkit (createReducer Toolkit)
// The reducer doesn’t know what to do unless it sees the action type.
// The store only updates state when an action is dispatched.
// Without actions, you cannot signal the reducer to update state.

// 3️⃣ In Redux Toolkit (createSlice)
// Toolkit auto-generates action creators when you use createSlice.
// So you don’t have to write them manually, but actions still exist under the hood.
// Example with createSlice:
/*
const counterSlice = createSlice({
  name: "counter",
  initialState: { initCount: 0 },
  reducers: {
    increment(state) { state.initCount += 1 },
    setValue(state, action: PayloadAction<number>) { state.initCount = action.payload }
  }
})

export const { increment, setValue } = counterSlice.actions  // actions are auto-created
*/