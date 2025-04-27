import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, LoginResponse } from '@/app/types/api';
import { addUser, deleteUser, getUserById, getUserByNin, getUsers, updateUser } from '@/app/services/api/userApi';
import { setCurrentUser } from '../slices/userSlice';

// Fetch users
export const fetchUsers = createAsyncThunk<User[]>(
    'user/fetchUsers',
    async () => {
        const users = await getUsers();
        return users;
    }
);

// Get user by ID
export const fetchUserById = createAsyncThunk<User, string>(
    'user/fetchUserById',
    async (id: string) => {
        const user = await getUserById(id);
        return user;
    }
);

// Add a new user
export const addUserThunk = createAsyncThunk<User, Omit<User, 'id'>>(
    'user/addUser',
    async (user: Omit<User, 'id'>) => {
        const newUser = await addUser(user);
        return newUser;
    }
);

// Update an existing user
export const updateUserThunk = createAsyncThunk<User, { id: string, user: Partial<User> }>(
    'user/updateUser',
    async ({ id, user }) => {
        const updatedUser = await updateUser(id, user);
        return updatedUser;
    }
);

// Delete a user
export const deleteUserThunk = createAsyncThunk<void, string>(
    'user/deleteUser',
    async (id: string) => {
        await deleteUser(id);
    }
);

// Switch account by NIN
export const switchAccount = createAsyncThunk<User, string>(
    'user/switchAccount',
    async (nin: string, thunkAPI) => {
        const user = await getUserByNin(nin);
        thunkAPI.dispatch(setCurrentUser(user));
        return user;
    }
);

// Login user
// export const login = createAsyncThunk<LoginResponse, { nin: string; password: string }, { rejectValue: string }>(
//     'user/login',
//     async ({ nin, password }, thunkAPI) => {
//         try {
//             const response = await loginApi({ nin, password });
//             // thunkAPI.dispatch(setCurrentUser(response.user));
//             return response;
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
//         }
//     }
// );
function loginApi(arg0: { nin: string; password: string; }) {
    throw new Error('Function not implemented.');
}

