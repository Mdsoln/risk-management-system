import { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, Input, message } from 'antd';
import {
    MoreOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
} from '@ant-design/icons';

import {
    getBusinessProcessList,
    getBusinessProcessById,
    addBusinessProcess,
    updateBusinessProcess,
    deleteBusinessProcess,
} from '@/app/services/api/businessProcessApi';

import {
    BusinessProcessPojo,
    BusinessProcessDTO,
    PaginationResult,
    ErrorState,
    SimplifiedFundObjectivePojo,
    SimplifiedDepartmentPojo,
} from '@/app/types/api';

import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
import AddEditBusinessProcessModal from './AddEditBusinessProcessModal';
import ViewBusinessProcessModal from './ViewBusinessProcessModal';
import { getFundObjectiveList } from '@/app/services/api/fundObjectiveApi';
import { getDepartments } from '@/app/services/api/departmentApi';

const BusinessProcessTable: React.FC = () => {
    // States
    const [dataSource, setDataSource] = useState<BusinessProcessPojo[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [errorState, setErrorState] = useState<ErrorState | null>(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedProcess, setSelectedProcess] = useState<Partial<BusinessProcessDTO> | null>(null);
    const [viewProcess, setViewProcess] = useState<BusinessProcessPojo | null>(null);

    const [fundObjectives, setFundObjectives] = useState<SimplifiedFundObjectivePojo[]>([]);
    const [departments, setDepartments] = useState<SimplifiedDepartmentPojo[]>([]);

    // Fetch data
    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize, searchKeyword);
        fetchFundObjectives();
        fetchDepartments();
    }, [pagination.current, pagination.pageSize, searchKeyword]); //eslint-disable-line react-hooks/exhaustive-deps

    const fetchData = async (page: number, pageSize: number, keyword: string) => {
        setLoading(true);
        setErrorState(null);

        try {
            const data: PaginationResult<BusinessProcessPojo> = await getBusinessProcessList(page - 1, pageSize, keyword);
            setDataSource(data.items);
            setPagination({ current: data.currentPage + 1, pageSize: data.pageSize, total: data.totalItems });
        } catch (error: any) {
            setErrorState({
                message: 'Error fetching data.',
                description: 'Unable to load business processes. Please try again later.',
                errors: [],
                refId: null,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchFundObjectives = async () => {
        try {
            const data = await getFundObjectiveList(0, 100);
            setFundObjectives(data.items);
        } catch (error) {
            message.error('Error fetching fund objectives.');
        }
    };

    const fetchDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            message.error('Error fetching departments.');
        }
    };

    // Search handler
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    // View handler
    const handleView = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBusinessProcessById(id);
            setViewProcess(data); // Set process for view modal
            setViewModalOpen(true); // Open view modal
        } catch (error) {
            message.error('Error fetching details.');
        } finally {
            setLoading(false);
        }
    };

    // Edit handler
    const handleEdit = async (id: string) => {
        setLoading(true);
        try {
            const data = await getBusinessProcessById(id);
            // Map to DTO format
            const dto: BusinessProcessDTO = {
                id: data.id,
                name: data.name,
                description: data.description,
                fundObjectiveId: data.fundObjective.id,
                businessProcessOwnerDepartmentId: data.businessProcessOwnerDepartment.id,
                startDateTime: data.startDateTime,
                endDateTime: data.endDateTime,
            };
            setSelectedProcess(dto); // Set data for edit modal
            setModalOpen(true); // Open modal
        } catch (error) {
            message.error('Error fetching details.');
        } finally {
            setLoading(false);
        }
    };

    // Delete handler
    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteBusinessProcess(id);
            message.success('Deleted successfully.');
            fetchData(pagination.current, pagination.pageSize, searchKeyword);
        } catch (error) {
            message.error('Error deleting.');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        setSelectedProcess(null);
        setModalOpen(true);
    };

    const handleTableChange = (pagination: any) => {
        setPagination({ current: pagination.current, pageSize: pagination.pageSize, total: pagination.total });
    };

    const getRowMenuItems = (record: BusinessProcessPojo) => [
        {
            key: 'view',
            icon: <EyeOutlined />,
            label: 'View',
            onClick: () => handleView(record.id),
        },
        {
            key: 'edit',
            icon: <EditOutlined />,
            label: 'Edit',
            onClick: () => handleEdit(record.id),
        },
        {
            key: 'delete',
            icon: <DeleteOutlined />,
            label: 'Delete',
            onClick: () => handleDelete(record.id),
        },
    ];

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Start Date', dataIndex: 'startDateTime', key: 'startDateTime' },
        { title: 'End Date', dataIndex: 'endDateTime', key: 'endDateTime' },
        { title: 'Owner Department', dataIndex: ['businessProcessOwnerDepartment', 'name'], key: 'departmentName' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: BusinessProcessPojo) => (
                <Dropdown overlay={<Menu items={getRowMenuItems(record)} />} trigger={['click']}>
                    <Button type="text"><MoreOutlined /></Button>
                </Dropdown>
            ),
        },
    ];

    return (
        <div>
            <Input placeholder="Search" onChange={handleSearchChange} />
            <Button type="primary" onClick={handleAdd}>Add Process</Button>
            <Table columns={columns} dataSource={dataSource} />

            <AddEditBusinessProcessModal
                visible={modalOpen}
                initialValues={selectedProcess || undefined}
                fundObjectives={fundObjectives} // Add this line
                departments={departments}       // Add this line
                onSubmit={async (values) => {
                    if (selectedProcess?.id) {
                        await updateBusinessProcess(selectedProcess.id, values);
                    } else {
                        await addBusinessProcess(values);
                    }
                    fetchData(pagination.current, pagination.pageSize, searchKeyword);
                    setModalOpen(false);
                }}
                onCancel={() => setModalOpen(false)}
            />


            <ViewBusinessProcessModal
                visible={viewModalOpen}
                data={viewProcess}
                onClose={() => setViewModalOpen(false)}
            />
        </div>
    );
};

export default BusinessProcessTable;
