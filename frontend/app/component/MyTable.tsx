
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

    const fetchData = async (page: number) => {
        setLoading(true);
        try {
            const data = await getRiskRegistryList(page, riskRegistries.pageSize);
            setRiskRegistries(data as any);
        } catch (error) {
            console.error('Error fetching data:', error);
            showErrorModal(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData(0); // Fetch first page by default
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
