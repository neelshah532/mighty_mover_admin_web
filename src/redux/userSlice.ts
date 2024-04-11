import { createSlice } from '@reduxjs/toolkit';
interface User {
    name: string;
    email: string;
}
interface initialState {
    user: {
        id: null | string;
        name: null | User;
        email: null | User;
        token: null | string;
    };
}

const localState = localStorage.getItem('user') || '';
const userData = localState && JSON.parse(localState || '');

const initialState: initialState = {
    user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token: userData.token,
    },
};
const userSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        AdminAdd: (state, action) => {
            state.user = action.payload;
        },
        Adminlogout: (state) => {
            state.user = {
                id: null,
                name: null,
                email: null,
                token: null,
            };
            localStorage.clear();
        },
    },
});
export const { AdminAdd, Adminlogout } = userSlice.actions;
export default userSlice.reducer;
