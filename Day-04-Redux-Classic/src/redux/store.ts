import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducer/countReducer";

// Why configuring store ?
// You configure the store with that reducer (configureStore({ reducer: { counter: counterReducer } })). The store holds the single global state tree.
// configureStore is the recommended Toolkit helper. 
// It sets up good defaults (Redux DevTools, sensible middleware) and accepts a reducer map. 
// Because you passed { counter: counterReducer }, the state shape becomes { counter: { initCount: number } }.
export const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch   

// RootState and AppDispatch are type helpers to give your React + TypeScript code accurate types. 
// They are not built-in variables — you define them using the store so they always match the real store shape and dispatch type.