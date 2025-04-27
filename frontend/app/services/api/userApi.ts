
import axios from 'axios';
import { ApiResponse, User } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of users
export const getUsers = async (): Promise<User[]> => {
    const url = `${API_V1}/users`;
    const response = await axios.get<ApiResponse<User[] | User[][]>>(url);
    let data = response.data.data ?? [];

    // If data is an array of arrays, flatten it
    if (Array.isArray(data) && Array.isArray(data[0])) {
        data = (data as User[][]).flat();
    }

    return data as User[];
};

// Get a single user by ID
export const getUserById = async (id: string): Promise<User> => {
    const url = `${API_V1}/users/${id}`;
    const response = await axios.get<ApiResponse<User | null>>(url);
    const data = response.data.data;

    if (data === null) {
        throw new Error('User not found');
    }

    return data as User;
};

// Get a single user by NIN
export const getUserByNin = async (nin: string): Promise<User> => {
    const url = `${API_V1}/users/nin/${nin}`;
    const response = await axios.get<ApiResponse<User | null>>(url);
    const data = response.data.data;

    if (data === null) {
        throw new Error('User not found');
    }

    return data as User;
};

// Add a new user
export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
    const response = await axios.post<ApiResponse<User>>(`${API_V1}/users`, user);
    return response.data.data as User;
};

// Update an existing user
export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
    try {
        const response = await axios.put<ApiResponse<User>>(`${API_V1}/users/${id}`, user);
        return response.data.data as User;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete a user
export const deleteUser = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/users/${id}`);
};
