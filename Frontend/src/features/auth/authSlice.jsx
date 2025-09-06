import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value:{
        user:null,
        isLoggedIn:false,
    }
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        addUser: (state,action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;

        },
        removeUser: (state)=>{
            state.user = null;
            state.isLoggedIn = false;

        }

    }
})

export const {addUser,removeUser} = authSlice.actions;

export default authSlice.reducer;