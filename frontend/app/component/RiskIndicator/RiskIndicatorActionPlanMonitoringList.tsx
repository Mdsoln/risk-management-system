import React from 'react';
import { Table, Button, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { RiskIndicatorActionPlanMonitoringDto } from '@/app/types/api';
import AddEditRiskIndicatorActionPlanMonitoringForm from './AddEditRiskIndicatorActionPlanMonitoringForm';

interface RiskIndicatorActionPlanMonitoringListProps {
    monitoringList: RiskIndicatorActionPlanMonitoringDto[];
    onEdit: (monitoring: RiskIndicatorActionPlanMonitoringDto) => void;
    onDelete: (id: string) => void;
}

const RiskIndicatorActionPlanMonitoringList: React.FC<RiskIndicatorActionPlanMonitoringListProps> = ({
    monitoringList,
    onEdit,
    onDelete,
}) => {
    const [editingMonitoring, setEditingMonitoring] = React.useState<RiskIndicatorActionPlanMonitoringDto | null>(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleEdit = (monitoring: RiskIndicatorActionPlanMonitoringDto) => {
        setEditingMonitoring(monitoring);
        setIsModalVisible(true);
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this monitoring entry?',
            onOk: () => {
                onDelete(id);
                message.success('Monitoring entry deleted successfully');
            },
        });
    };

    const handleAdd = () => {
        setEditingMonitoring(null);
        setIsModalVisible(true);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleModalOk = async (values: Partial<RiskIndicatorActionPlanMonitoringDto>) => {
        if (values.startDatetime && values.endDatetime && values.value && values.measurementId) {
            const fullValues: RiskIndicatorActionPlanMonitoringDto = {
                ...editingMonitoring,
                ...values,
                startDatetime: values.startDatetime || '', // Ensure a valid startDatetime
                endDatetime: values.endDatetime || '',     // Ensure a valid endDatetime
                value: values.value || '',                 // Ensure a valid value
                measurementId: values.measurementId || '', // Ensure a valid measurementId
                riskIndicatorActionPlanId: values.riskIndicatorActionPlanId || '', // Ensure a valid riskIndicatorActionPlanId
            };
            onEdit(fullValues);
            setIsModalVisible(false);
        } else {
            message.error('Please fill in all required fields.');
        }
    };


    const columns = [
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
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Measurement',
            dataIndex: ['measurement', 'name'],
            key: 'measurement',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text: string, record: RiskIndicatorActionPlanMonitoringDto) => (
                <>
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id!)} />
                </>
            ),
        },
    ];

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
                Add Monitoring Entry
            </Button>
            <Table columns={columns} dataSource={monitoringList} rowKey="id" />

            <Modal
                title={editingMonitoring ? 'Edit Monitoring Entry' : 'Add Monitoring Entry'}
                visible={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <AddEditRiskIndicatorActionPlanMonitoringForm
                    initialValues={editingMonitoring || {}}
                    onSubmit={handleModalOk}
                    onCancel={handleModalCancel}
                    loading={false}
                />
            </Modal>
        </>
    );
};

export default RiskIndicatorActionPlanMonitoringList;
