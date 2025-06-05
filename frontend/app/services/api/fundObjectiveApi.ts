import axios from 'axios';
import { FundObjectivePojo, FundObjectiveDTO, PaginationResult, FundObjective, ApiResponse } from '@/app/types/api';
import { API_V1 } from '@/app/constants/api';

// Base API endpoint
const BASE_URL = '/api/v1/fund-objective';

export const getFundObjectives = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string,
    startDate?: string,
    endDate?: string,
    filterDateBy: string = 'createdAt',
    sort: string[] = [],
    sortDirection: string = 'desc'
): Promise<PaginationResult<FundObjective>> => {
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
    const url = `${API_V1}/fund-objective/list?${queryParams}`;

    const response = await axios.get<{ data: PaginationResult<FundObjective> }>(url);
    return response.data.data;
};


/**
 * Get a paginated list of Fund Objectives.
 */
export const getFundObjectiveList = async (
    page: number = 0,
    size: number = 10,
    searchKeyword?: string
): Promise<PaginationResult<FundObjectivePojo>> => {
    const params: any = {
        page,
        size,
        sort: 'createdAt',
        sortDirection: 'desc',
    };
    if (searchKeyword) {
        params.searchKeyword = searchKeyword;
    }

    const response = await axios.get(`${BASE_URL}/list`, { params });
    return response.data.data; // Assuming the data is inside the `data` field
};

/**
 * Get a Fund Objective by ID.
 */
export const getFundObjectiveById = async (id: string): Promise<FundObjectivePojo> => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data.data; // Assuming the data is inside the `data` field
};

/**
 * Add a new Fund Objective.
 */
export const addFundObjective = async (dto: FundObjectiveDTO): Promise<FundObjectivePojo> => {
    const response = await axios.post(BASE_URL, dto);
    return response.data.data; // Assuming the data is inside the `data` field
};

/**
 * Update an existing Fund Objective by ID.
 */
export const updateFundObjective = async (id: string, data: FundObjective | FundObjectiveDTO): Promise<ApiResponse<FundObjective>> => {
    try {
        const response = await fetch(`/api/fund-objective/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return {
            code: response.status,
            message: response.ok ? 'Success' : 'Failed to update',
            data: result, // Assuming the API returns the updated FundObjective
            errors: response.ok ? null : result.errors || [],
            description: response.ok ? 'Fund objective updated successfully' : 'Failed to update fund objective',
            refId: result.refId || null,
        };
    } catch (error) {
        return {
            code: 500,
            message: 'Internal server error',
            data: null,
            errors:[error],
            description: 'An error occurred while updating the fund objective',
            refId: '',
        };
        }
    }

/**
 * Delete a Fund Objective by ID.
 */
export const deleteFundObjective = async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};

/**
 * Get Fund Objectives by Business Process ID.
 */
export const getFundObjectivesByBusinessProcess = async (
    businessProcessId: string
): Promise<FundObjectivePojo[]> => {
    const response = await axios.get(`${BASE_URL}/by-business-process/${businessProcessId}`);
    return response.data.data; // Assuming the data is inside the `data` field
};
