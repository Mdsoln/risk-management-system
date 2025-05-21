import React from 'react';
import { Modal, Input, Button, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { RiskRegistry } from '../../types/api/RiskRegistry';
import { addRiskRegistry } from '../../services/api/riskRegistryApi';

interface AddRiskRegistryProps {
    open: boolean;
    onClose: () => void;
    onAdd: () => void;
}

const AddRiskRegistry: React.FC<AddRiskRegistryProps> = ({ open, onClose, onAdd }) => {
    const { handleSubmit, control, formState: { errors }, reset } = useForm<Omit<RiskRegistry, 'id'>>();
    const [loading, setLoading] = React.useState<boolean>(false);

    const onSubmit = async (data: Omit<RiskRegistry, 'id'>) => {
        setLoading(true);
        try {
            await addRiskRegistry(data as any);
            message.success('Risk registry added successfully');
            onAdd();
            onClose();
            reset();
        } catch (error) {
            console.error('Error adding data:', error);
            message.error('Error adding risk registry');
        }
        setLoading(false);
    };

    return (
        <Modal
            open={open}
            title="Add Risk Registry"
            onCancel={onClose}
            footer={null}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Name</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Please enter the name' }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div>
                    <label>Description</label>
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'Please enter the description' }}
                        render={({ field }) => <Input {...field} />}
                    />
                    {errors.description && <p>{errors.description.message}</p>}
                </div>

                <div style={{ marginTop: 20 }}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddRiskRegistry;
