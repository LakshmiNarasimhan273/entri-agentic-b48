import { createSlice } from "@reduxjs/toolkit";

// Global data
const initialState = {
    count: 0,
};

const counterSlice = createSlice({
    // 1- name of slice | 2- global data declaration
    // 3- reducers functions
    name: "counter",
    initialState, // alice name state
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        reset: (state) => {
            state.count = 0;
        }
    }
});

export const {increment, decrement, reset} = counterSlice.actions;

export default counterSlice.reducer;
// reducer - common thing - global data, reducer functions