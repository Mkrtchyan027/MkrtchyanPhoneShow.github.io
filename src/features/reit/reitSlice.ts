import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

const initialState:{arr:any, rate:any}={
    arr:[],
    rate:{}
}


const rateSlice=createSlice({
    name:'reit',
    initialState,
    reducers:{
        allrate:(state, action:PayloadAction<object>)=>{
            state.arr=action.payload
        },
        getrate:(state, action)=>{
            state.rate=state.arr.find((e:any)=>e==action.payload)
        },
        deleteRateById:(state, action:PayloadAction<string>)=>{
            state.arr=state.arr.filter((e:any)=>e.id!=action.payload)
        }
    }
})

export const { allrate, getrate, deleteRateById } = rateSlice.actions;

export const selectrate=(state:RootState)=>state.rate

export default rateSlice.reducer;