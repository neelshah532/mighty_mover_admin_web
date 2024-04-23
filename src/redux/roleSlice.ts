import { createSlice } from '@reduxjs/toolkit';

interface Permission {
    section: string;
    permission: string[];
}   

interface Role {
    id: string;
    name: string;
    permission: Permission[];
}

interface InitialState {
    roles: Role[];
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
