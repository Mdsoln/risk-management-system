import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RiskActionPlanMonitoringDto } from '@/app/types/api';
import AddEditRiskActionPlanMonitoringModal from './AddEditRiskActionPlanMonitoringModal';

interface RiskActionPlanMonitoringListTableProps {
    monitoringList: RiskActionPlanMonitoringDto[];
    onEdit: (updatedMonitoring: RiskActionPlanMonitoringDto) => void;
    onDelete: (monitoringId: string) => void;
}

const RiskActionPlanMonitoringListTable: React.FC<RiskActionPlanMonitoringListTableProps> = ({
    monitoringList,
    onEdit,
    onDelete,
}) => {
    const [editingMonitoring, setEditingMonitoring] = useState<RiskActionPlanMonitoringDto | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleEdit = (monitoring: RiskActionPlanMonitoringDto) => {
        setEditingMonitoring(monitoring);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this monitoring entry?',
            onOk: () => onDelete(id),
        });
    };

    const handleAdd = () => {
        setEditingMonitoring(null);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleModalOk = async (values: Partial<RiskActionPlanMonitoringDto>) => {
        const updatedValues: RiskActionPlanMonitoringDto = {
            ...editingMonitoring,
            ...values,
            comment: values.comment || editingMonitoring?.comment || '',
            monitoringDatetime: values.monitoringDatetime || editingMonitoring?.monitoringDatetime || '',
            riskActionPlanId: values.riskActionPlanId || editingMonitoring?.riskActionPlanId || '',
        };

        onEdit(updatedValues);
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Monitoring Datetime',
            dataIndex: 'monitoringDatetime',
            key: 'monitoringDatetime',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: RiskActionPlanMonitoringDto) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id!)} />
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />} style={{ marginBottom: '16px' }}>
                Add Monitoring Entry
            </Button>
            <Table
                columns={columns}
                dataSource={monitoringList}
                rowKey="id"
            />
            {isModalVisible && (
                <AddEditRiskActionPlanMonitoringModal
                    visible={isModalVisible}
                    initialValues={editingMonitoring || {}}
                    onSubmit={handleModalOk}
                    onCancel={handleModalCancel}
                />
            )}
        </>
    );
};

export default RiskActionPlanMonitoringListTable;
