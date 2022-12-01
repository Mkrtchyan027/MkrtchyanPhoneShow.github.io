import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store";
import { fetchUser } from "./userAPI"

const initialState:{arr:any, profile:any}={
    arr:[],
    profile:{}
}

export const userFetchLink=createAsyncThunk(
    'user/userfetch',
    async({func, obj}:{func:Function, obj:any})=>{
        const data=await fetchUser(func, obj);
        return data;
    }
)

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser:(state, action:PayloadAction<object>)=>{
            state.arr=action.payload
        },
        getUser:(state, action)=>{
            state.profile=action.payload
        },   
    },
    extraReducers:(builder)=>{
        builder.addCase(userFetchLink.pending, (state, action)=>{
            console.log("loading")
        })
        builder.addCase(userFetchLink.fulfilled, (state, action)=>{
            console.log(action.payload)
            state.arr=action.payload;
        })
        builder.addCase(userFetchLink.rejected, (state, action)=>{
            console.log("reject")
        })
    }
})

export const { addUser, getUser } = userSlice.actions;

export const selectUser=(state:RootState)=>state.user

export default userSlice.reducer;