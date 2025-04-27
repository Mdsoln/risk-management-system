// department.pts
import axios from 'axios';
import { ApiResponse, Department, Directorate } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a list of owner departments
export const getRiskOwners = async (): Promise<Directorate[]> => {
    const url = `${API_V1}/department/risk-owners`;
    const response = await axios.get<ApiResponse<Directorate[] | Directorate[][]>>(url);
    let data = response.data.data ?? [];

    // Check if the data contains nested arrays and flatten them if necessary
    if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
        data = data.flat() as Directorate[];
    }

    return data as Directorate[];
};

// // Fetch a list of owner departments
// export const getDepartments = async (): Promise<Department[]> => {
//     const url = `${API_V1}/department`;
//     const response = await axios.get<ApiResponse<Department[] | Department[][]>>(url);
//     let data = response.data.data ?? [];

//     // Check if the data contains nested arrays and flatten them if necessary
//     if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
//         data = data.flat() as Department[];
//     }

//     return data as Department[];
// };

// Get a single owner department by ID
export const getDepartmentById = async (id: string): Promise<Department> => {
    const url = `${API_V1}/department/${id}`;
    const response = await axios.get<ApiResponse<Department | Department[] | null>>(url);
    const data = response.data.data;

    if (data === null || Array.isArray(data)) {
        throw new Error('Owner department not found');
    }

    return data as Department;
};

// Add a new owner department
export const addDepartment = async (department: Omit<Department, 'id'>): Promise<Department> => {
    const response = await axios.post<ApiResponse<Department>>(`${API_V1}/department`, department);
    return response.data.data as Department;
};

// Update an existing owner department
export const updateDepartment = async (id: string, department: Partial<Department>): Promise<Department> => {
    try {
        const response = await axios.put<ApiResponse<Department>>(`${API_V1}/department/${id}`, department);
        return response.data.data as Department;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            throw error.response.data;
        } else {
            throw error;
        }
    }
};

// Delete an owner department
export const deleteDepartment = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/department/${id}`);
};
