import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    users: [],
    updateValue: null,
};
export const userSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        register: (state = initialState, action) => {
            state.users.push(action.payload);
            state.updateValue = null;
        },
        removeUser: (state = initialState, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },
        editUser: (state = initialState, action) => {
            state.updateValue = action.payload;
        },
        updateUser: (state = initialState, action) => {
            const { id } = action.payload;
            const index = state.users.findIndex((user) => user.id === id);
            state.users.splice(index, 1, action.payload);
            state.updateValue = null;
        },
    },
});
export const { register, removeUser, updateUser, editUser } = userSlice.actions;
export default userSlice.reducer;
