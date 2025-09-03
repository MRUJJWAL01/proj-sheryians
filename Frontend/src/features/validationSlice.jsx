const { createSlice } = require("@reduxjs/toolkit");


const validationSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        isLoggedIn:null,

    },
    reducers:{
        addUser:(state,action)=>{
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        removeUser:(state)=>{
            state.user = null;
            state.isLoggedIn = false;
        }
    }
})

export const {addUser,removeUser} = validationSlice.actions;

export default validationSlice.reducer;