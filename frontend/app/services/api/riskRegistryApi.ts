// import axios from 'axios';
// import { PaginationResult, ApiResponse } from '../../types/api/';
// import { API_V1 } from '@/app/constants/api';
// import { RiskRegistry } from '@/app/types/api/RiskRegistry';

// export const getRiskRegistries = async (
//     page: number = 0,
//     size: number = 10,
//     searchKeyword?: string,
//     startDate?: string,
//     endDate?: string,
//     filterDateBy: string = 'createdAt',
//     sort: string[] = [],
//     sortDirection: string = 'desc'
// ): Promise<PaginationResult<RiskRegistry>> => {
//     const params: Record<string, any> = {
//         page,
//         size,
//         filterDateBy,
//         sortDirection,
//     };

//     if (searchKeyword) params.searchKeyword = searchKeyword;
//     if (startDate) params.startDate = startDate;
//     if (endDate) params.endDate = endDate;
//     if (sort.length > 0) params.sort = sort;

//     const queryParams = new URLSearchParams(params as any).toString();
//     const url = `${API_V1}/risk-registry/list?${queryParams}`;

//     const response = await axios.get<{ data: PaginationResult<RiskRegistry> }>(url);
//     return response.data.data;
// };

// export const getRiskRegistryById = async (id: string): Promise<RiskRegistry> => {
//     const url = `${API_V1}/risk-registry/${id}`;
//     const response = await axios.get<ApiResponse<RiskRegistry>>(url);
//     return response.data.data as RiskRegistry;
// };

// export const addRiskRegistry = async (riskRegistry: Omit<RiskRegistry, 'id'>): Promise<RiskRegistry> => {
//     const response = await axios.post<RiskRegistry>(`${API_V1}/risk-registry`, riskRegistry);
//     return response.data;
// };

// export const updateRiskRegistry = async (id: string, riskRegistry: Partial<RiskRegistry>): Promise<ApiResponse<RiskRegistry>> => {
//     try {
//         const response = await axios.put<ApiResponse<RiskRegistry>>(`${API_V1}/risk-registry/${id}`, riskRegistry);
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error) && error.response) {
//             throw error.response.data;
//         } else {
//             throw error;
//         }
//     }
// };

// export const deleteRiskRegistry = async (id: string): Promise<void> => {
//     await axios.delete(`${API_V1}/risk-registry/${id}`);
// };
import axios from 'axios';
import {
    RiskRegistryDTO,
    RiskRegistryPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api/';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of risk registries with optional filters
export const getRiskRegistryList = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<RiskRegistryPojo>> => {
    const params: Record<string, any> = {
        page,
        size,
        filterDateBy,
        sortDirection,
    };

    if (searchKeyword) params.searchKeyword = searchKeyword;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (sort.length > 0) params.sort = sort;

    const queryParams = new URLSearchParams(params as any).toString();
    const url = `${API_V1}/risk-registry/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<RiskRegistryPojo> }>(url);
    return response.data.data; // Return paginated data directly
};

// Get a single risk registry by ID
export const getRiskRegistryById = async (
    id: string
): Promise<RiskRegistryPojo> => {
    const url = `${API_V1}/risk-registry/${id}`;
    const response = await axios.get<ApiResponse<RiskRegistryPojo | null>>(url);

    const data = response.data.data;

    // Validate if the data is null
    if (!data) {
        throw new Error('Risk registry not found.');
    }

    // Ensure the data is not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as RiskRegistryPojo; // Safe type return
};

// Add a new risk registry
export const addRiskRegistry = async (
    registry: RiskRegistryDTO
): Promise<ApiResponse<RiskRegistryDTO>> => {
    const response = await axios.post<ApiResponse<RiskRegistryDTO>>(
        `${API_V1}/risk-registry`,
        registry
    );
    return response.data;
};

// Update an existing risk registry
export const updateRiskRegistry = async (
    id: string,
    registry: Partial<RiskRegistryDTO>
): Promise<ApiResponse<RiskRegistryDTO>> => {
    const response = await axios.put<ApiResponse<RiskRegistryDTO>>(
        `${API_V1}/risk-registry/${id}`,
        registry
    );
    return response.data;
};

// Delete a risk registry
export const deleteRiskRegistry = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/risk-registry/${id}`);
};
