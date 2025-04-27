import axios from 'axios';
import {
    BcmSupplierDTO,
    BcmSupplierPojo,
    PaginationResult,
    ApiResponse,
} from '../../types/api';
import { API_V1 } from '@/app/constants/api';

// Fetch a paginated list of suppliers with optional filters
export const getBcmSuppliers = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<BcmSupplierPojo>> => {
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
    const url = `${API_V1}/bcm/supplier/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<BcmSupplierPojo> }>(url);
    return response.data.data; // Return paginated data
};

// Get a single supplier by ID
export const getBcmSupplierById = async (id: string): Promise<BcmSupplierPojo> => {
    const url = `${API_V1}/bcm/supplier/${id}`;
    const response = await axios.get<ApiResponse<BcmSupplierPojo | null>>(url);

    const data = response.data.data;

    // Validate data
    if (!data) {
        throw new Error('Supplier not found.');
    }

    // Ensure it's not an array
    if (Array.isArray(data)) {
        throw new Error('Unexpected data format: Received an array instead of an object.');
    }

    return data as BcmSupplierPojo;
};

// Add a new supplier
export const addBcmSupplier = async (
    supplier: BcmSupplierDTO
): Promise<ApiResponse<BcmSupplierDTO>> => {
    const response = await axios.post<ApiResponse<BcmSupplierDTO>>(
        `${API_V1}/bcm/supplier`,
        supplier
    );
    return response.data;
};

// Update an existing supplier
export const updateBcmSupplier = async (
    id: string,
    supplier: Partial<BcmSupplierDTO>
): Promise<ApiResponse<BcmSupplierDTO>> => {
    const response = await axios.put<ApiResponse<BcmSupplierDTO>>(
        `${API_V1}/bcm/supplier/${id}`,
        supplier
    );
    return response.data;
};

// Delete a supplier
export const deleteBcmSupplier = async (id: string): Promise<void> => {
    await axios.delete(`${API_V1}/bcm/supplier/${id}`);
};
