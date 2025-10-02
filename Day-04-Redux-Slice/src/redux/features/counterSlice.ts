import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


const initialState = {
    count: 0
}

const counterSlice = createSlice({   // createSlice bundles state, reducers, and actions together.
    name: "counter",
    initialState,
    reducers: {
        incrementing: (currentState: any) => {
            currentState.count += 1    // Immer is used: you can “mutate” state directly (e.g., state.count += 1) safely.
        },
        decrementing: (currentState: any) => {
            currentState.count -= 1
        },
        valueSetting: (currentState: any, currentAction: PayloadAction<number>) => {
            currentState.count = currentAction.payload
        }
    }
})

// actions auto-generated
// Actions are auto-generated, so no need to manually define createAction or objects.
export const {
    incrementing, decrementing, valueSetting
} = counterSlice.actions

// reducer (function) to include in store
export default counterSlice.reducer