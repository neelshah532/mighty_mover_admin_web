import { createSlice } from '@reduxjs/toolkit';

interface Permission {
    section: null | string;
    permission: null | string[];
}   

interface Role {
    id: null | string;
    name: null | string;
    permission: null | Permission[];
}

interface InitialState {
    roles: null | Role[];
}

const localState = localStorage.getItem('user') || '';
const userData = localState && JSON.parse(localState || '');

const initialState: InitialState = {
    roles: [
        {
            id: userData.id,
            name: userData.first_name,
            permission: userData.permissions,
        },
    ],
};

const rolePermissionSlice = createSlice({
    name: 'rolePermission',
    initialState,
    reducers: {
        setRoles: (state, action) => {
            state.roles = action.payload;
        },
    },
});

export const { setRoles } = rolePermissionSlice.actions;
export default rolePermissionSlice.reducer;
