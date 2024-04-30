import { createSlice } from '@reduxjs/toolkit';

export interface Permission {
    section: null | string;
    permission: null | string[];
}

export interface Role {
    id: null | string;
    name: null | string;
    permission: null | Permission[];
}

const localState = localStorage.getItem('user') || '';
const userData = localState && JSON.parse(localState || '');
// console.log(userData);

const initialState: Role = {
    id: userData?.id || null,
    name: userData?.first_name || null,
    permission: userData?.permission || null,
};


console.log(initialState);

const rolePermissionSlice = createSlice({
    name: 'rolePermission',
    initialState,
    reducers: {
        setRoles: (state, action) => {
             state.id = action.payload.id;
             state.name = action.payload.name;
             state.permission = action.payload.permission;
        },
        resetState: (state) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            state.id = null;
            state.name = null;
            state.permission = null;
        },
    },
});

export const { setRoles, resetState } = rolePermissionSlice.actions;
export default rolePermissionSlice.reducer;
