// src/store/slices/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUsers, fetchUserById, addUserThunk, updateUserThunk, deleteUserThunk, switchAccount } from '../thunks/authThunks';
import { User } from '@/app/types/api';

interface UserState {
    currentUser?: User;
    users: User[];
    loading: boolean;
    error?: string;
}

const initialState: UserState = {
    currentUser: undefined,
    users: [],
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload;
        },
        // other reducers...
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
            })
            .addCase(switchAccount.fulfilled, (state, action: PayloadAction<User>) => {
                state.currentUser = action.payload;
            })
            .addCase(addUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
                state.users.push(action.payload);
            })
            .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
                const index = state.users.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })

    }
});

export const { setCurrentUser } = userSlice.actions;  // Ensure this is exported
export const { reducer: userReducer } = userSlice;
export default userReducer;
