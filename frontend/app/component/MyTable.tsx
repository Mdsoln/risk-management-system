// // src/components/MyTable.tsx
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Input, Space, Popconfirm } from 'antd';
// import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// import AddEditModal from './AddEditModal';
// import { getItems, addItem, updateItem, deleteItem } from '../services/apiService';
// import { Item } from '../types';
// import { getRiskRegistries } from '../services/api/riskRegistryApi';
// import { PaginationData } from '../types/api/PaginationData';
// import { RiskRegistry } from '../types/api/riskRegistry';

// const MyTable: React.FC = () => {
//     const [data, setData] = useState<PaginationData<RiskRegistry>>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [searchText, setSearchText] = useState<string>('');
//     const [searchedColumn, setSearchedColumn] = useState<keyof Item | ''>('');
//     const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//     const [editingItem, setEditingItem] = useState<Item | null>(null);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const items = await getRiskRegistries();
//             // setData(items);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//         setLoading(false);
//     };

//     const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: keyof Item) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };

//     const handleReset = (clearFilters: () => void) => {
//         clearFilters();
//         setSearchText('');
//     };
//     const getColumnSearchProps = (dataIndex: keyof Item) => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
//             <div style={{ padding: 8 }}>
//                 <Input
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{ marginBottom: 8, display: 'block' }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Search
//                     </Button>
//                     <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//                         Reset
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//         onFilter: (value: string | number | boolean, record: Item) => {
//             const dataValue = record[dataIndex];
//             if (typeof dataValue === 'string' || typeof dataValue === 'number') {
//                 return dataValue.toString().toLowerCase().includes(value.toString().toLowerCase());
//             }
//             return false;
//         },
//         render: (text: any) =>
//             searchedColumn === dataIndex ? (
//                 <span>{text}</span>
//             ) : (
//                 text
//             ),
//     });

//     const handleAdd = () => {
//         setIsModalVisible(true);
//         setEditingItem(null);
//     };

//     const handleEdit = (item: Item) => {
//         setIsModalVisible(true);
//         setEditingItem(item);
//     };

//     const handleDelete = async (id: number) => {
//         try {
//             await deleteItem(id);
//             fetchData();
//         } catch (error) {
//             console.error('Error deleting item:', error);
//         }
//     };

//     const handleSubmit = async (item: Item) => {
//         try {
//             if (editingItem) {
//                 await updateItem(editingItem.id, item);
//             } else {
//                 await addItem(item);
//             }
//             fetchData();
//             setIsModalVisible(false);
//         } catch (error) {
//             console.error('Error saving item:', error);
//         }
//     };

//     const columns: any = [
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//             ...getColumnSearchProps('name'),
//         },
//         {
//             title: 'Age',
//             dataIndex: 'age',
//             key: 'age',
//             sorter: (a: Item, b: Item) => a.age - b.age,
//         },
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             key: 'address',
//             ...getColumnSearchProps('address'),
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (_: any, record: Item) => (
//                 <Space size="middle">
//                     <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
//                     <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
//                         <Button type="link" danger>Delete</Button>
//                     </Popconfirm>
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <>
//             <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
//                 Add Item
//             </Button>
//             <Table
//                 columns={columns}
//                 dataSource={data}
//                 loading={loading}
//                 rowKey="id"
//                 pagination={{ pageSize: 10 }}
//             />
//             <AddEditModal
//                 visible={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 onSubmit={handleSubmit}
//                 initialValues={editingItem}
//             />
//         </>
//     );
// };

// export default MyTable;


// // src/components/MyTable.tsx
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Input, Space, Popconfirm } from 'antd';
// import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// import AddEditModal from './AddEditModal';
// import { getItems, addItem, updateItem, deleteItem } from '../services/apiService';
// import { Item } from '../types';
// import { getRiskRegistries } from '../services/api/riskRegistryApi';
// import { PaginationData } from '../types/api/PaginationData';
// import { RiskRegistry } from '../types/api/riskRegistry';

// const MyTable: React.FC = () => {



//     const initialPaginationData: PaginationData<RiskRegistry> = {
//         currentPage: 0,
//         totalPages: 0,
//         totalItems: 0,
//         pageSize: 0,
//         hasPrevious: false,
//         hasNext: false,
//         items: []
//     };
//     const [data, setData] = useState<PaginationData<RiskRegistry>>(initialPaginationData);


//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const items = await getRiskRegistries();
//             // setData(items);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//         setLoading(false);
//     };

//     const handleSearch = (selectedKeys: string[], confirm: () => void, dataIndex: keyof Item) => {
//         confirm();
//         setSearchText(selectedKeys[0]);
//         setSearchedColumn(dataIndex);
//     };

//     const handleReset = (clearFilters: () => void) => {
//         clearFilters();
//         setSearchText('');
//     };
//     const getColumnSearchProps = (dataIndex: keyof Item) => ({
//         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
//             <div style={{ padding: 8 }}>
//                 <Input
//                     placeholder={`Search ${dataIndex}`}
//                     value={selectedKeys[0]}
//                     onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//                     onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                     style={{ marginBottom: 8, display: 'block' }}
//                 />
//                 <Space>
//                     <Button
//                         type="primary"
//                         onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//                         icon={<SearchOutlined />}
//                         size="small"
//                         style={{ width: 90 }}
//                     >
//                         Search
//                     </Button>
//                     <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
//                         Reset
//                     </Button>
//                 </Space>
//             </div>
//         ),
//         filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
//         onFilter: (value: string | number | boolean, record: Item) => {
//             const dataValue = record[dataIndex];
//             if (typeof dataValue === 'string' || typeof dataValue === 'number') {
//                 return dataValue.toString().toLowerCase().includes(value.toString().toLowerCase());
//             }
//             return false;
//         },
//         render: (text: any) =>
//             searchedColumn === dataIndex ? (
//                 <span>{text}</span>
//             ) : (
//                 text
//             ),
//     });

//     const handleAdd = () => {
//         setIsModalVisible(true);
//         setEditingItem(null);
//     };

//     const handleEdit = (item: Item) => {
//         setIsModalVisible(true);
//         setEditingItem(item);
//     };

//     const handleDelete = async (id: number) => {
//         try {
//             await deleteItem(id);
//             fetchData();
//         } catch (error) {
//             console.error('Error deleting item:', error);
//         }
//     };

//     const handleSubmit = async (item: Item) => {
//         try {
//             if (editingItem) {
//                 await updateItem(editingItem.id, item);
//             } else {
//                 await addItem(item);
//             }
//             fetchData();
//             setIsModalVisible(false);
//         } catch (error) {
//             console.error('Error saving item:', error);
//         }
//     };

//     const columns: any = [
//         {
//             title: 'Name',
//             dataIndex: 'name',
//             key: 'name',
//             ...getColumnSearchProps('name'),
//         },
//         {
//             title: 'Age',
//             dataIndex: 'age',
//             key: 'age',
//             sorter: (a: Item, b: Item) => a.age - b.age,
//         },
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             key: 'address',
//             ...getColumnSearchProps('address'),
//         },
//         {
//             title: 'Action',
//             key: 'action',
//             render: (_: any, record: Item) => (
//                 <Space size="middle">
//                     <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
//                     <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
//                         <Button type="link" danger>Delete</Button>
//                     </Popconfirm>
//                 </Space>
//             ),
//         },
//     ];

//     return (
//         <>
//             <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />}>
//                 Add Item
//             </Button>
//             <Table
//                 columns={columns}
//                 dataSource={data}
//                 loading={loading}
//                 rowKey="id"
//                 pagination={{ pageSize: 10 }}
//             />
//             <AddEditModal
//                 visible={isModalVisible}
//                 onCancel={() => setIsModalVisible(false)}
//                 onSubmit={handleSubmit}
//                 initialValues={editingItem}
//             />
//         </>
//     );
// };

// export default MyTable;



// import React, { useEffect, useState } from 'react';
// import { PaginationData } from '../types/api/PaginationData';
// import { RiskRegistry } from '../types/api/riskRegistry';
// import { getRiskRegistries } from '../services/api/riskRegistryApi';

// const RiskRegister: React.FC = () => {



//     const initialPaginationData: PaginationData<RiskRegistry> = {
//         currentPage: 0,
//         totalPages: 0,
//         totalItems: 0,
//         pageSize: 0,
//         hasPrevious: false,
//         hasNext: false,
//         items: []
//     };

//     const [riskRegistries, setRiskRegistries] = useState<PaginationData<RiskRegistry>>(initialPaginationData);


//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         // setLoading(true);
//         try {
//             const items = await getRiskRegistries();
//             setRiskRegistries(items)
//             // setData(items);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//         // setLoading(false);
//     };


//     return (


//         <div>
//             <h1>Risk Register</h1>
//             <div><pre>{
//                 JSON.stringify(riskRegistries, null, 2)}</pre></div>

//         </div>
//     );
// };

// export default RiskRegister;


import React, { useEffect, useState } from 'react';
import { PaginationResult } from '../types/api/PaginationData';
import { RiskRegistry } from '../types/api/RiskRegistry';
import { getRiskRegistryList } from '../services/api/riskRegistryApi';
import { Card, Modal, Table } from 'antd';
// import 'antd/dist/antd.css';

const RiskRegister: React.FC = () => {
    const initialPaginationData: PaginationResult<RiskRegistry> = {
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
        pageSize: 10,
        hasPrevious: false,
        hasNext: false,
        items: []
    };

    const [riskRegistries, setRiskRegistries] = useState<PaginationResult<RiskRegistry>>(initialPaginationData);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData(0); // Fetch first page by default
    }, [fetchData]);

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const data = await getRiskRegistryList(page, riskRegistries.pageSize);
            setRiskRegistries(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            showErrorModal(error);
        }
        setLoading(false);
    };

    const showErrorModal = (error: any) => {
        Modal.error({
            title: 'Error Fetching Data',
            content: 'There was an error fetching the data. Please try again later.',
        });
    };

    const handlePageChange = (page: number) => {
        fetchData(page);
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },

        { title: 'Status', dataIndex: 'status', key: 'status' },

        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
        // { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt' },
    ];

    return (
        <div>
            <Card>
                <h1>Risk Register</h1>
            </Card>

            <Table
                dataSource={riskRegistries.items}
                columns={columns}
                loading={loading}
                pagination={{
                    current: riskRegistries.currentPage,
                    total: riskRegistries.totalItems,
                    pageSize: riskRegistries.pageSize,
                    onChange: handlePageChange,
                }}
                rowKey="id"
            />

        </div>
    );
};

export default RiskRegister;
