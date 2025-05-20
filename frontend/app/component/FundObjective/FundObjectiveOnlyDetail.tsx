import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Descriptions, Divider, message } from 'antd';
import { ErrorState, FundObjective } from '@/app/types/api';
import { BarsOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import DisplayTitle from '../Display/DisplayTitle';
import EditableParagraph from '../Display/EditableParagraph';
import EditableTextarea from '../Display/EditableTextarea';
import ErrorDisplayAlert from '../Alert/ErrorDisplayAlert';
// import { handleApiResponse } from '@/app/utils/apiResponseHandler';
import { updateFundObjective, getFundObjectiveById } from '@/app/services/api/fundObjectiveApi';
import './FundObjectiveOnlyDetail.css'; // Import the custom CSS

interface FundObjectiveOnlyDetailProps {
    viewData: FundObjective | null;
    refreshData: () => void;
}

const FundObjectiveOnlyDetail: React.FC<FundObjectiveOnlyDetailProps> = ({ viewData, refreshData }) => {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [isEditingAll, setIsEditingAll] = useState(false);
    const [errorState, setErrorState] = useState<ErrorState>({
        message: null,
        description: null,
        errors: null,
        refId: null,
    });

    const methods = useForm<FundObjective>({ defaultValues: viewData || {} });

    useEffect(() => {
        if (viewData) {
            methods.reset(viewData);
        }
    }, [viewData, methods]);

    const handleEdit = (field: keyof FundObjective) => {
        setEditingField(field);
    };

    const handleCancel = () => {
        setEditingField(null);
        if (viewData) {
            methods.reset(viewData);
        }
        setErrorState({ message: null, description: null, errors: null, refId: null });
    };

    const handleSave = async () => {
        const data = methods.getValues();
        await handleApiResponse(
            () => updateFundObjective(viewData!.id, data),
            setErrorState,
            async () => {
                message.success('Updated successfully');
                setEditingField(null);
                refreshData(); // Trigger the parent component to refresh data
            }
        );
    };

    const handleEditAll = () => {
        setIsEditingAll(true);
        setEditingField(null);
    };

    const handleCancelAll = () => {
        setIsEditingAll(false);
        if (viewData) {
            methods.reset(viewData);
        }
        setErrorState({ message: null, description: null, errors: null, refId: null });
    };

    const handleSaveAll = async () => {
        const data = methods.getValues();
        await handleApiResponse(
            () => updateFundObjective(viewData!.id, data),
            setErrorState,
            async () => {
                message.success('Updated successfully');
                setIsEditingAll(false);
                refreshData(); // Trigger the parent component to refresh data
            }
        );
    };

    const handleFieldChange = (name: keyof FundObjective, value: any) => {
        methods.setValue(name, value);
    };

    if (!viewData) {
        return <div>No data available</div>;
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit((data) => console.log('Form Submitted:', data))}>
                {errorState.message && (
                    <ErrorDisplayAlert
                        errorState={errorState}
                        onClose={() => setErrorState({ message: null, description: null, errors: null, refId: null })}
                    />
                )}
                <DisplayTitle text="Fund Objective" icon={<BarsOutlined />} />



                <Descriptions bordered size="small" className="custom-descriptions-item-content" >
                    <Descriptions.Item label={<span className="custom-descriptions-item-label">ID</span>} span={1}>
                        <EditableParagraph
                            label=""
                            name="id"
                            value={viewData.id}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onChange={(value) => handleFieldChange('id', value)}
                            isEditing={false}
                            isEditable={false}
                            isEditingAll={false}
                            onEdit={() => handleEdit('id')}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="custom-descriptions-item-label">Name</span>} span={2}>
                        <EditableParagraph
                            label=""
                            name="name"

                            value={viewData.name}
                            rules={{ required: 'Name is required' }}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onChange={(value) => handleFieldChange('name', value)}
                            isEditing={editingField === 'name' || isEditingAll}
                            isEditable={!isEditingAll}
                            isEditingAll={isEditingAll}
                            onEdit={() => handleEdit('name')}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="custom-descriptions-item-label">Start Date</span>} span={1}>
                        <EditableParagraph
                            label=""
                            name="startDateTime"
                            value={viewData.startDateTime}
                            rules={{ required: 'Start Date is required' }}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onChange={(value) => handleFieldChange('startDateTime', value)}
                            isEditing={editingField === 'startDateTime' || isEditingAll}
                            isEditable={!isEditingAll}
                            isEditingAll={isEditingAll}
                            type="datetime"
                            onEdit={() => handleEdit('startDateTime')}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="custom-descriptions-item-label">End Date</span>} span={2}>
                        <EditableParagraph
                            label=""
                            name="endDateTime"
                            value={viewData.endDateTime}
                            rules={{ required: 'End Date is required' }}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onChange={(value) => handleFieldChange('endDateTime', value)}
                            isEditing={editingField === 'endDateTime' || isEditingAll}
                            isEditable={!isEditingAll}
                            isEditingAll={isEditingAll}
                            type="datetime"
                            onEdit={() => handleEdit('endDateTime')}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<span className="custom-descriptions-item-label">Status</span>} span={1}>
                        <EditableParagraph
                            label=""
                            name="status"
                            value={viewData.status}
                            rules={{ required: 'Status is required' }}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onChange={(value) => handleFieldChange('status', value)}
                            isEditing={false}
                            isEditable={false}
                            isEditingAll={false}
                            onEdit={() => handleEdit('status')}
                        />
                    </Descriptions.Item>





                </Descriptions>

                <EditableTextarea
                    label="Description:"
                    name="description"
                    value={viewData.description}
                    rules={{ required: 'Description is required' }}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    onChange={(value) => handleFieldChange('description', value)}
                    isEditing={editingField === 'description' || isEditingAll}
                    isEditable={!isEditingAll}
                    isEditingAll={isEditingAll}
                    onEdit={() => handleEdit('description')}
                />



                {isEditingAll ? (
                    <div className="button-container">
                        <Button type="primary" onClick={handleSaveAll} style={{ marginTop: '10px' }}>
                            Save All
                        </Button>
                        <Button onClick={handleCancelAll} style={{ marginTop: '10px' }}>
                            Cancel All
                        </Button>
                    </div>
                ) : (
                    <div className="button-container">
                        <Button onClick={handleEditAll} style={{ marginTop: '10px' }}>
                            Edit All
                        </Button>
                    </div>
                )}

            </form>
        </FormProvider>
    );
};

export default FundObjectiveOnlyDetail;
async function handleApiResponse(
    apiCall: () => Promise<import("@/app/types/api").ApiResponse<FundObjective>>,
    setErrorState: React.Dispatch<React.SetStateAction<ErrorState>>,
    onSuccess: () => Promise<void>
) {
    try {
        const response = await apiCall();
        if (response.code === '200' || response.code === '201') {
            await onSuccess();
        } else {
            setErrorState({
                message: response.message || 'An error occurred',
                description: response.description || null,
                errors: response.errors || null,
                refId: response.refId || null
            });
        }
    } catch (error: any) {
        setErrorState({
            message: error.message || 'An error occurred',
            description: error.description || null,
            errors: error.errors || null,
            refId: error.refId || null
        });
    }
}
