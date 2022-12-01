import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";

const initialState:{arr:any, wishlist:any}={
    arr:[],
    wishlist:{}
}


const wishlistSlice=createSlice({
    name:'wishlist',
    initialState,
    reducers:{
        allwishlist:(state, action:PayloadAction<object>)=>{
            state.arr=action.payload
        },
        getwishlist:(state, action)=>{
            state.wishlist=state.arr.find((e:any)=>e==action.payload)
        },
        deleteWishById:(state, action:PayloadAction<string>)=>{
            state.arr=state.arr.filter((e:any)=>e.id!=action.payload)
        }
    }
})

export const { allwishlist, getwishlist, deleteWishById } = wishlistSlice.actions;

export const selectwishlist=(state:RootState)=>state.wishlist

export default wishlistSlice.reducer;