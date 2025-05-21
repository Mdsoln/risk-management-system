"use client"

const ListRiskRegister = () => {
    return (
        <></>
    )
}

// import React, { useEffect, useState } from 'react';
// import { RiskRegistry } from '../../types/api/RiskRegistry';
// import { getRiskRegistries, deleteRiskRegistry } from '../../services/api/riskRegistryApi';
// import { Table, Modal, Button, message, Dropdown, Menu, Space } from 'antd';
// import {
//     PlusOutlined,
//     EyeOutlined,
//     EditOutlined,
//     HighlightTwoTone,
//     DeleteOutlined,
//     MoreOutlined
// } from '@ant-design/icons';
// import ViewRiskRegistry from './ViewRiskRegistry';
// import EditRiskRegistry from './EditRiskRegistry';
// import ApproveRiskRegistry from './ApproveRiskRegistry';
// import AddRiskRegistry from './AddRiskRegistry';

// import './ListRiskRegister.module.css';
// import { PaginationResult } from '@/app/types/api';

// const ListRiskRegister: React.FC = () => {
//     const initialPaginationData: PaginationResult<RiskRegistry> = {
//         currentPage: 1,
//         totalPages: 0,
//         totalItems: 0,
//         pageSize: 10,
//         hasPrevious: false,
//         hasNext: false,
//         items: []
//     };

//     const [riskRegistries, setRiskRegistries] = useState<PaginationResult<RiskRegistry>>(initialPaginationData);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [viewModalVisible, setViewModalVisible] = useState<boolean>(false);
//     const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
//     const [approveModalVisible, setApproveModalVisible] = useState<boolean>(false);
//     const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
//     const [currentRisk, setCurrentRisk] = useState<RiskRegistry | null>(null);

//     useEffect(() => {
//         fetchData(1); // Fetch first page by default
//     }, []);

//     const fetchData = async (page: number) => {
//         setLoading(true);
//         try {
//             const data = await getRiskRegistries(page, riskRegistries.pageSize);
//             setRiskRegistries(data);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             showErrorModal(error);
//         }
//         setLoading(false);
//     };

//     const handlePageChange = (page: number) => {
//         fetchData(page);
//     };

//     const showErrorModal = (error: any) => {
//         Modal.error({
//             title: 'Error Fetching Data',
//             content: 'There was an error fetching the data. Please try again later.',
//         });
//     };

//     const handleView = (risk: RiskRegistry) => {
//         setCurrentRisk(risk);
//         setViewModalVisible(true);
//     };

//     const handleEdit = (risk: RiskRegistry) => {
//         setCurrentRisk(risk);
//         setEditModalVisible(true);
//     };

//     const handleApprove = (risk: RiskRegistry) => {
//         setCurrentRisk(risk);
//         setApproveModalVisible(true);
//     };

//     const handleDelete = async (id: number) => {
//         Modal.confirm({
//             title: 'Confirm Delete',
//             content: 'Are you sure you want to delete this risk registry?',
//             okText: 'Yes',
//             okType: 'danger',
//             cancelText: 'No',
//             onOk: async () => {
//                 // try {
//                 //     await deleteRiskRegistry(id);
//                 //     message.success('Risk registry deleted successfully');
//                 //     fetchData(riskRegistries.currentPage);
//                 // } catch (error) {
//                 //     console.error('Error deleting data:', error);
//                 //     message.error('Error deleting risk registry');
//                 // }
//             },
//         });
//     };

//     const renderMenuItems = (record: RiskRegistry) => [
//         {
//             key: 'view',
//             icon: <EyeOutlined />,
//             label: 'View',
//             onClick: () => handleView(record),
//         },
//         {
//             key: 'edit',
//             icon: <EditOutlined />,
//             label: 'Edit',
//             onClick: () => handleEdit(record),
//         },
//         {
//             key: 'approve',
//             icon: <HighlightTwoTone />,
//             label: 'Review',
//             onClick: () => handleApprove(record),
//         },
//         {
//             key: 'delete',
//             icon: <DeleteOutlined />,
//             label: 'Delete',
//             danger: true,
//             onClick: () => handleDelete(record.id),
//         },
//     ];

//     const menu = (record: RiskRegistry) => (
//         <Menu>
//             {renderMenuItems(record).map((item) => (
//                 <Menu.Item key={item.key} danger={item.danger} onClick={item.onClick}>
//                     {item.icon} {item.label}
//                 </Menu.Item>
//             ))}
//         </Menu>
//     );

//     const columns = [
//         { title: 'Name', dataIndex: 'name', key: 'name' },
//         { title: 'Status', dataIndex: 'status', key: 'status' },
//         { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt', render: (text: string) => new Date(text).toLocaleDateString() },
//         { title: 'Updated At', dataIndex: 'updatedAt', key: 'updatedAt', render: (text: string) => new Date(text).toLocaleDateString() },
//         {
//             title: 'Actions',
//             key: 'actions',
//             render: (text: any, record: RiskRegistry) => (
//                 <Dropdown overlay={menu(record)} trigger={['click']}>
//                     <Button icon={<MoreOutlined />} />
//                 </Dropdown>
//             )
//         }
//     ];

//     return (
//         <div>
//             <h1>Risk Register</h1>
//             <Button
//                 type="primary"
//                 icon={<PlusOutlined />}
//                 style={{ marginBottom: 16, float: 'right' }}
//                 onClick={() => setAddModalVisible(true)}
//             >
//                 Add Risk Registry
//             </Button>
//             <Table
//                 dataSource={riskRegistries.items}
//                 columns={columns}
//                 loading={loading}
//                 pagination={{
//                     current: riskRegistries.currentPage,
//                     total: riskRegistries.totalItems,
//                     pageSize: riskRegistries.pageSize,
//                     onChange: handlePageChange,
//                 }}
//                 rowKey="id"
//                 size="small"
//             />
//             <ViewRiskRegistry
//                 open={viewModalVisible}
//                 onClose={() => setViewModalVisible(false)}
//                 riskRegistry={currentRisk}
//             />
//             <EditRiskRegistry
//                 open={editModalVisible}
//                 onClose={() => setEditModalVisible(false)}
//                 riskRegistry={currentRisk}
//                 onUpdate={() => fetchData(riskRegistries.currentPage)}
//             />
//             <ApproveRiskRegistry
//                 open={approveModalVisible}
//                 onClose={() => setApproveModalVisible(false)}
//                 riskRegistry={currentRisk}
//                 onUpdate={() => fetchData(riskRegistries.currentPage)}
//             />
//             <AddRiskRegistry
//                 open={addModalVisible}
//                 onClose={() => setAddModalVisible(false)}
//                 onAdd={() => fetchData(riskRegistries.currentPage)}
//             />
//         </div>
//     );
// };

export default ListRiskRegister;
