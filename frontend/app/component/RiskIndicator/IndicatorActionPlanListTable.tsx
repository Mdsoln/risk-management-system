import React, { useState } from 'react';
import { Table, Button, Popconfirm, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RiskIndicatorActionPlanDto } from '@/app/types/api';
import AddEditRiskIndicatorActionPlanFormModal from './AddEditRiskIndicatorActionPlanFormModal'; // Import the modal component
import RiskIndicatorActionPlanMonitoringList from './RiskIndicatorActionPlanMonitoringList';

interface IndicatorActionPlanListTableProps {
    actionPlans: RiskIndicatorActionPlanDto[];
    onEdit: (updatedActionPlan: RiskIndicatorActionPlanDto) => void;
    onDelete: (actionPlanId: string) => void;
}

const IndicatorActionPlanListTable: React.FC<IndicatorActionPlanListTableProps> = ({
    actionPlans,
    onEdit,
    onDelete,
}) => {
    const [editingActionPlan, setEditingActionPlan] = useState<RiskIndicatorActionPlanDto | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleEdit = (actionPlan: RiskIndicatorActionPlanDto) => {
        setEditingActionPlan(actionPlan);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this action plan?',
            onOk: () => onDelete(id),
        });
    };

    const handleAdd = () => {
        setEditingActionPlan(null);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleModalOk = async (values: Partial<RiskIndicatorActionPlanDto>) => {
        const updatedValues: RiskIndicatorActionPlanDto = {
            ...editingActionPlan,
            ...values,
            name: values.name || editingActionPlan?.name || '',
            description: values.description || editingActionPlan?.description || '',
            startDatetime: values.startDatetime || editingActionPlan?.startDatetime || '',
            endDatetime: values.endDatetime || editingActionPlan?.endDatetime || '',
            departmentId: values.departmentId || editingActionPlan?.departmentId || '',
            riskIndicatorId: values.riskIndicatorId || editingActionPlan?.riskIndicatorId || '',
            riskIndicatorActionPlanMonitoring: values.riskIndicatorActionPlanMonitoring || editingActionPlan?.riskIndicatorActionPlanMonitoring || [],
        };

        onEdit(updatedValues);
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Action Plan Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Start Datetime',
            dataIndex: 'startDatetime',
            key: 'startDatetime',
        },
        {
            title: 'End Datetime',
            dataIndex: 'endDatetime',
            key: 'endDatetime',
        },
        {
            title: 'Department',
            dataIndex: ['department', 'name'],
            key: 'department',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: RiskIndicatorActionPlanDto) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id!)} />
                </>
            ),
        },
    ];

    const expandedRowRender = (record: RiskIndicatorActionPlanDto) => {
        return (
            <div>
                <RiskIndicatorActionPlanMonitoringList
                    monitoringList={record.riskIndicatorActionPlanMonitoring || []}
                    onEdit={(updatedMonitoring) => {
                        const updatedMonitoringList = record.riskIndicatorActionPlanMonitoring?.map(monitoring =>
                            monitoring.id === updatedMonitoring.id ? updatedMonitoring : monitoring
                        ) || [];

                        const updatedRecord = {
                            ...record,
                            riskIndicatorActionPlanMonitoring: updatedMonitoringList,
                        };

                        onEdit(updatedRecord);
                    }}
                    onDelete={(monitoringId) => {
                        const updatedMonitoringList = record.riskIndicatorActionPlanMonitoring?.filter(monitoring =>
                            monitoring.id !== monitoringId
                        ) || [];

                        const updatedRecord = {
                            ...record,
                            riskIndicatorActionPlanMonitoring: updatedMonitoringList,
                        };

                        onEdit(updatedRecord);
                    }}
                />
                <Button
                    type="dashed"
                    onClick={() => handleAdd()}
                    icon={<PlusOutlined />}
                    style={{ marginTop: 16 }}
                >
                    Add Monitoring Entry
                </Button>
            </div>
        );
    };

    return (
        <>
            <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />} style={{ marginBottom: '16px' }}>
                Add Action Plan
            </Button>
            <Table
                columns={columns}
                dataSource={actionPlans}
                rowKey="id"
                expandable={{ expandedRowRender }}
            />
            {isModalVisible && (
                <AddEditRiskIndicatorActionPlanFormModal
                    visible={isModalVisible}
                    initialValues={editingActionPlan || {}}
                    onSubmit={handleModalOk}
                    onCancel={handleModalCancel}
                    width="65%"  // Set modal width
                    height="65vh"  // Set modal height
                />
            )}


        </>
    );
};

export default IndicatorActionPlanListTable;
