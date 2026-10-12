import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.count += 10;
        }
    }
});

export const {increment} = counterSlice.actions;
export default counterSlice.reducer;