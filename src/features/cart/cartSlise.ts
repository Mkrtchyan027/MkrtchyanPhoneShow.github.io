import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

const initialState:{arr:any, cart:any}={
    arr:[],
    cart:{}
}


const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        allcart:(state, action:PayloadAction<object>)=>{
            state.arr=action.payload    
        },
        getcart:(state, action)=>{
            state.cart=action.payload
        },
        deleteCartById:(state, action)=>{
            state.arr=state.arr.filter((e:any)=>e.id!=action.payload)
        }
    }
})

export const { allcart, getcart,deleteCartById} = cartSlice.actions;

 export const selectcart=(state:RootState)=>state.cart

export default cartSlice.reducer;