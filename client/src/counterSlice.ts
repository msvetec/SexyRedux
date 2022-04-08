import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title:"sexy new redux (.)(.)"
}

/*
    createSlice and createReducer APIs use IMMET inside to allow us to write "mutating" update logic that becomes correct immutable updates
    state.variable = newVariable instead {...sate, vatiable: newVariable}
*/ 
export const counterSlice = createSlice({
    name:'counter', //name
    initialState, //object initial state
    reducers: {
        increment: (state, action) => {
            state.data += action.payload
        },
        decrement: (state, action) =>{
            state.data -= action.payload
        }
    }
})

//exporting functions increment, decrement
export const {increment,decrement} = counterSlice.actions;