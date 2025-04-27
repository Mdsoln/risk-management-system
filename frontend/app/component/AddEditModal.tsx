// src/components/AddEditModal.tsx
import React, { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useForm } from 'react-hook-form';
import { Item } from '../types';

interface AddEditModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (data: Item) => void;
    initialValues?: Item | null; // Accept null or undefined
}

const AddEditModal: React.FC<AddEditModalProps> = ({ visible, onCancel, onSubmit, initialValues }) => {
    const { register, handleSubmit, reset } = useForm<Item>();

    useEffect(() => {
        reset(initialValues || {});
    }, [initialValues, reset]);

    return (
        <Modal
            title={initialValues ? 'Edit Item' : 'Add Item'}
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Form.Item label="Name">
                    <Input {...register('name', { required: true })} />
                </Form.Item>
                <Form.Item label="Age">
                    <Input type="number" {...register('age', { required: true })} />
                </Form.Item>
                <Form.Item label="Address">
                    <Input {...register('address', { required: true })} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {initialValues ? 'Update' : 'Add'}
                    </Button>
                </Form.Item>
            </form>
        </Modal>
    );
};

export default AddEditModal;
