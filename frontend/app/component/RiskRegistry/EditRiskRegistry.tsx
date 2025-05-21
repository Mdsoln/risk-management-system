import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { RiskRegistry } from '../../types/api/RiskRegistry';
import { updateRiskRegistry } from '../../services/api/riskRegistryApi';

interface EditRiskRegistryProps {
    open: boolean;
    onClose: () => void;
    riskRegistry: RiskRegistry | null;
    onUpdate: (page: number) => void;
}

const EditRiskRegistry: React.FC<EditRiskRegistryProps> = ({ open, onClose, riskRegistry, onUpdate }) => {
    const [loading, setLoading] = useState<boolean>(false);

    if (!riskRegistry) return null;

    const handleFinish = async (values: any) => {
        setLoading(true);
        try {
            await updateRiskRegistry(`${riskRegistry.id}`, values);
            // message.success('Risk registry updated successfully');
            onUpdate(1); // Update first page by default
            onClose();
        } catch (error) {
            console.error('Error updating data:', error);
            // message.error('Error updating risk registry');
        }
        setLoading(false);
    };

    return (
        <Modal
            open={open}
            title="Edit Risk Registry"
            onCancel={onClose}
            footer={null}
        >
            <Form
                initialValues={riskRegistry}
                onFinish={handleFinish}
                layout="vertical"
            >
                <Form.Item name="name" label="Name">
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input />
                </Form.Item>
                <Form.Item name="category" label="Category">
                    <Input />
                </Form.Item>
                <Form.Item name="likelihood" label="Likelihood">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="impact" label="Impact">
                    <Input type="number" />
                </Form.Item>
                <Form.Item name="status" label="Status">
                    <Input />
                </Form.Item>
                <Form.Item name="owner" label="Owner">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRiskRegistry;
