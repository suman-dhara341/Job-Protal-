import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        loading: false,
        user:null
    },
    reducers: {
        setLoader:(state,action)=>{
            state.loading=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }
    }
})

export const { setLoader, setUser }=authSlice.actions

export default authSlice.reducer