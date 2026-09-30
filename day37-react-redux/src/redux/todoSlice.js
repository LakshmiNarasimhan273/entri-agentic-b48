import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // Create todo
        // action - take the data from components
        /*
            action = {
                payload{
                    input1:
                    input2:
                }
            }
         */
        addTodo: (state, action) => {
            state.todos.push({
                id: Date.now(),
                title: action.payload.title,
                status: action.payload.status
            });
        }
    }
});

export const {addTodo} = todoSlice.actions;

export default todoSlice.reducer;