import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { RiskActionPlanDto } from '@/app/types/api';
import AddEditRiskActionPlanModal from './AddEditRiskActionPlanModal';

interface RiskActionPlanListTableProps {
    actionPlans: RiskActionPlanDto[];
    onChange: (actionPlans: RiskActionPlanDto[]) => void;
}

const RiskActionPlanListTable: React.FC<RiskActionPlanListTableProps> = ({ actionPlans, onChange }) => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentActionPlan, setCurrentActionPlan] = useState<Partial<RiskActionPlanDto>>({});

    const handleAdd = () => {
        setCurrentActionPlan({});
        setEditingIndex(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record: RiskActionPlanDto, index: number) => {
        setCurrentActionPlan(record);
        setEditingIndex(index);
        setIsModalVisible(true);
    };

    const handleDelete = (index: number) => {
        const newActionPlans = actionPlans.filter((_, i) => i !== index);
        onChange(newActionPlans);
        message.success('Risk Action Plan deleted successfully');
    };

    const handleSave = async (actionPlan: Partial<RiskActionPlanDto>) => {
        if (editingIndex !== null) {
            const newActionPlans = [...actionPlans];
            newActionPlans[editingIndex] = actionPlan as RiskActionPlanDto;
            onChange(newActionPlans);
            message.success('Risk Action Plan updated successfully');
        } else {
            onChange([...actionPlans, actionPlan as RiskActionPlanDto]);
            message.success('Risk Action Plan added successfully');
        }
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'Action Plan Name',
            dataIndex: 'name',
            key: 'name',
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
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: RiskActionPlanDto, index: number) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record, index)} />
                    <Popconfirm title="Are you sure to delete?" onConfirm={() => handleDelete(index)}>
                        <Button icon={<DeleteOutlined />} style={{ marginLeft: '8px' }} />
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="dashed" onClick={handleAdd} icon={<PlusOutlined />} style={{ marginBottom: '16px' }}>
                Add Risk Action Plan
            </Button>
            <Table
                columns={columns}
                dataSource={actionPlans}
                rowKey="id"
            />
            {isModalVisible && (
                <AddEditRiskActionPlanModal
                    visible={isModalVisible}
                    initialValues={currentActionPlan}
                    onSubmit={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                    width="65%" // Pass width prop
                    height="65vh" // Pass height prop
                    context={'table'} />
            )}
        </>
    );
};

export default RiskActionPlanListTable;