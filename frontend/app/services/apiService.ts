// // // app/services/apiService.ts
// // import axios from 'axios';
// // import { Item } from '../types';

// // const API_URL = '/api';  // Use relative URL

// // export const getItems = async (): Promise<Item[]> => {
// //     const response = await axios.get<Item[]>(`${API_URL}/v1/categories`);
// //     return response.data;
// // };

// // export const addItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
// //     const response = await axios.post<Item>(`${API_URL}/v1/categories`, item);
// //     return response.data;
// // };

// // export const updateItem = async (id: number, item: Omit<Item, 'id'>): Promise<Item> => {
// //     const response = await axios.put<Item>(`${API_URL}/v1/categories/${id}`, item);
// //     return response.data;
// // };

// // export const deleteItem = async (id: number): Promise<void> => {
// //     await axios.delete(`${API_URL}/v1/categories/${id}`);
// // };
// // src/services/apiService.ts
// import axios from 'axios';
// import { Item } from '../types';

// const API_URL = '/api/v1';  // Use relative URL

// export const getItems = async (): Promise<Item[]> => {
//     const response = await axios.get<Item[]>(`${API_URL}/categories`);
//     return response.data;
// };

// export const addItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
//     const response = await axios.post<Item>(`${API_URL}/categories`, item);
//     return response.data;
// };

// export const updateItem = async (id: number, item: Omit<Item, 'id'>): Promise<Item> => {
//     const response = await axios.put<Item>(`${API_URL}/categories/${id}`, item);
//     return response.data;
// };

// export const deleteItem = async (id: number): Promise<void> => {
//     await axios.delete(`${API_URL}/categories/${id}`);
// };
