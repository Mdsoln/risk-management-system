// import axios from 'axios';
// import { API_V1 } from '@/app/constants/api';

// // Define the interface for the login request payload
// interface LoginDto {
//     nin: string;
//     password: string;
// }

// // Define the interface for the login response
// interface LoginResponse {
//     accessToken: string;
//     tokenType: string;
//     expiresIn: number;
//     refreshToken: string;
//     scope: string;
// }

// // Function to log in with NIN and password
// export const login = async (loginData: LoginDto): Promise<LoginResponse> => {
//     const url = `${API_V1}/auth/login`;

//     try {
//         const response = await axios.post<LoginResponse>(url, loginData);
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error) && error.response) {
//             throw new Error(error.response.data.message || 'Login failed');
//         } else {
//             throw new Error('An unknown error occurred during login');
//         }
//     }
// };


import axios from 'axios';
import { LoginDto, LoginResponse, User, ApiResponse } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Login API call
export const loginApi = async (payload: { nin: string; password: string }): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>(`${API_V1}/auth/login`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch user by NIN API call
export const getUserByNin = async (nin: string): Promise<User> => {
    const url = `${API_V1}/users/nin/${nin}`;
    const response = await axios.get<ApiResponse<User | null>>(url);
    const data = response.data.data;

    if (data === null) {
        throw new Error('User not found');
    }

    return data as User;
};
