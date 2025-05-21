// import axios from 'axios';
// import { BusinessProcess, PaginationResult, ApiResponse } from '../../types/api/';
// import { API_V1 } from '@/app/constants/api';

// export const getBusinessProcesses = async (
//     page: number = 0,
//     size: number = 10,
//     searchKeyword?: string,
//     startDate?: string,
//     endDate?: string,
//     filterDateBy: string = 'createdAt',
//     sort: string[] = [],
//     sortDirection: string = 'desc'
// ): Promise<PaginationResult<BusinessProcess>> => {
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
//     const url = `${API_V1}/business-process/list?${queryParams}`;

//     const response = await axios.get<{ data: PaginationResult<BusinessProcess> }>(url);
//     return response.data.data;
// };

// export const getBusinessProcessById = async (id: string): Promise<BusinessProcess> => {
//     const url = `${API_V1}/business-process/${id}`;
//     const response = await axios.get<ApiResponse<BusinessProcess>>(url);
//     return response.data.data as BusinessProcess;
// };

// export const addBusinessProcess = async (businessProcess: Omit<BusinessProcess, 'id'>): Promise<BusinessProcess> => {
//     const response = await axios.post<BusinessProcess>(`${API_V1}/business-process`, businessProcess);
//     return response.data;
// };

// export const updateBusinessProcess = async (id: string, businessProcess: Partial<BusinessProcess>): Promise<ApiResponse<BusinessProcess>> => {
//     try {
//         const response = await axios.put<ApiResponse<BusinessProcess>>(`${API_V1}/business-process/${id}`, businessProcess);
//         return response.data;
//     } catch (error) {
//         if (axios.isAxiosError(error) && error.response) {
//             throw error.response.data;
//         } else {
//             throw error;
//         }
//     }
// };

// export const deleteBusinessProcess = async (id: string): Promise<void> => {
//     await axios.delete(`${API_V1}/business-process/${id}`);
// };

// // Search business processes by name
// export const searchBusinessProcessesByName = async (name: string): Promise<BusinessProcess[]> => {
//     const url = `${API_V1}/business-process/search`;
//     const response = await axios.get<ApiResponse<BusinessProcess[] | BusinessProcess[][]>>(url, {
//         params: {
//             name,
//         },
//     });
//     let data = response.data.data ?? [];

//     // Check if the data contains nested arrays and flatten them if necessary
//     if (Array.isArray(data) && data.some(item => Array.isArray(item))) {
//         data = data.flat() as BusinessProcess[];
//     }

//     return data as BusinessProcess[];
// };
import axios from "axios";
import {
  BusinessProcessPojo,
  BusinessProcessDTO,
  PaginationResult,
  ApiResponse,
  BusinessProcess,
} from "@/app/types/api";
import { API_V1 } from "@/app/constants/api";
import { convertPojoToBusinessProcess } from "@/app/utils/converters";

const BASE_URL = "/api/v1/business-process";

/**
 * Get a paginated list of Business Processes.
 */
export const getBusinessProcessList = async (
  page: number = 0,
  size: number = 10,
  searchKeyword?: string
): Promise<PaginationResult<BusinessProcessPojo>> => {
  const params: any = {
    page,
    size,
    sort: "createdAt",
    sortDirection: "desc",
  };
  if (searchKeyword) {
    params.searchKeyword = searchKeyword;
  }

  const response = await axios.get(`${BASE_URL}/list`, { params });
  return response.data.data; // Assuming the data is inside the `data` field
};

/**
 * Get a Business Process by ID.
 */
export const getBusinessProcessById = async (
  id: string
): Promise<BusinessProcessPojo> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data.data; // Assuming the data is inside the `data` field
};

/**
 * Add a new Business Process.
 */
export const addBusinessProcess = async (
  dto: BusinessProcessDTO
): Promise<BusinessProcessPojo> => {
  const response = await axios.post(BASE_URL, dto);
  return response.data.data; // Assuming the data is inside the `data` field
};

/**
 * Update an existing Business Process by ID.
 */
export const updateBusinessProcess = async (
  id: string,
  dto: BusinessProcessDTO
): Promise<BusinessProcessPojo> => {
  const response = await axios.put(`${BASE_URL}/${id}`, dto);
  return response.data.data; // Assuming the data is inside the `data` field
};

/**
 * Delete a Business Process by ID.
 */
export const deleteBusinessProcess = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};

/**
 * Get Business Processes by Fund Objective ID.
 */
export const getBusinessProcessesByFundObjective = async (
  fundObjectiveId: string
): Promise<BusinessProcessPojo[]> => {
  const response = await axios.get(
    `${BASE_URL}/by-fund-objective/${fundObjectiveId}`
  );
  return response.data.data; // Assuming the data is inside the `data` field
};

/**
 * Search Business Processes by Name.
 */
export const searchBusinessProcesses = async (
  name: string
): Promise<BusinessProcessPojo[]> => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: { name },
  });
  return response.data.data; // Assuming the data is inside the `data` field
};

// Search business processes by name
export const searchBusinessProcessesByName = async (
  name: string
): Promise<BusinessProcess[]> => {
  const url = `${API_V1}/business-process/search`;
  const response = await axios.get<
    ApiResponse<BusinessProcessPojo[] | BusinessProcessPojo[][]>
  >(url, {
    params: {
      name,
    },
  });
  let data = response.data.data ?? [];

  // Check if the data contains nested arrays and flatten them if necessary
  if (Array.isArray(data) && data.some((item) => Array.isArray(item))) {
    data = data.flat() as BusinessProcessPojo[];
  }

  // Convert each BusinessProcessPojo to BusinessProcess
  return (data as BusinessProcessPojo[]).map((pojo) =>
    convertPojoToBusinessProcess(pojo)
  );
};

export const getBusinessProcesses = async (
  page: number = 0,
  size: number = 10,
  searchKeyword?: string,
  startDate?: string,
  endDate?: string,
  filterDateBy: string = "createdAt",
  sort: string[] = [],
  sortDirection: string = "desc"
): Promise<PaginationResult<BusinessProcess>> => {
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
  const url = `${API_V1}/business-process/list?${queryParams}`;

  const response = await axios.get<{
    data: PaginationResult<BusinessProcessPojo>;
  }>(url);

  // Convert the BusinessProcessPojo objects to BusinessProcess objects
  const result = response.data.data;
  return {
    ...result,
    // content: result.content.map(pojo => convertPojoToBusinessProcess(pojo))
    items: result.items.map((pojo) => convertPojoToBusinessProcess(pojo)),
  };
};
