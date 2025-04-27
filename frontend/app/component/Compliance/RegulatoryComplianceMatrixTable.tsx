import React from 'react';
import { Table, Button, Input } from 'antd';
import { RegulatoryComplianceMatrixDTO } from '@/app/types/api';

interface RegulatoryComplianceMatrixTableProps {
    data: RegulatoryComplianceMatrixDTO[];
    onAdd: (matrix: RegulatoryComplianceMatrixDTO) => void;
    onDelete: (index: number) => void;
}

const RegulatoryComplianceMatrixTable: React.FC<RegulatoryComplianceMatrixTableProps> = ({ data, onAdd, onDelete }) => {
    const columns = [
        { title: 'Item Number', dataIndex: 'itemNumber', key: 'itemNumber' },
        { title: 'Details', dataIndex: 'details', key: 'details' },
        { title: 'Department', dataIndex: ['department', 'name'], key: 'department' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, __: any, index: number) => (
                <Button type="link" danger onClick={() => onDelete(index)}>
                    Delete
                </Button>
            )
        },
    ];

    const handleAddMatrix = () => {
        const newMatrix: RegulatoryComplianceMatrixDTO = {
            itemNumber: '',
            details: '',
            departmentId: '',
            sections: [],
        };
        onAdd(newMatrix);
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record, index) => record.id || index}
                pagination={false}
            />
            <Button type="dashed" onClick={handleAddMatrix} style={{ marginTop: 10 }}>
                Add Matrix
            </Button>
        </div>
    );
};

export default RegulatoryComplianceMatrixTable;
