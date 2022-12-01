import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

const initialState:{arr:any, product:any}={
    arr:[],
    product:{}
}


const productSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        allProduct:(state, action:PayloadAction<object>)=>{
            state.arr=action.payload
        },
        getProduct:(state, action)=>{
            state.product=state.arr.find((e:any)=>e==action.payload)
        },
        deleteProductById:(state, action:PayloadAction<string>)=>{
            state.arr=state.arr.filter((e:any)=>e.id!=action.payload)
        }
    }
})

export const { allProduct, getProduct, deleteProductById } = productSlice.actions;

 export const selectProduct=(state:RootState)=>state.product

export default productSlice.reducer;