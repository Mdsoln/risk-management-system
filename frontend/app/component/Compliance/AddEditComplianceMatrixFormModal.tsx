import React, { useRef } from 'react';
import { Button } from 'antd';
import CustomModal from '../Modal/CustomModal';
import { RegulatoryComplianceMatrixDTO } from '@/app/types/api';
import { CloseCircleOutlined, FileAddFilled, EditFilled } from '@ant-design/icons';
import AddEditComplianceMatrixForm from './AddEditComplianceMatrixForm';

interface AddEditComplianceMatrixFormModalProps {
    visible: boolean;
    initialValues?: Partial<RegulatoryComplianceMatrixDTO>;
    onSubmit: (values: Partial<RegulatoryComplianceMatrixDTO>) => Promise<void>; // Fixed Partial Type
    onCancel: () => void;
    context: 'individual' | 'table'; // Added context
}

const AddEditComplianceMatrixFormModal: React.FC<AddEditComplianceMatrixFormModalProps> = ({
    visible,
    initialValues,
    onSubmit,
    onCancel,
    context, // Added context
}) => {
    const formRef = useRef<any>(null);

    // Submit Form
    const handleSubmit = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    // Cancel Modal
    const handleModalCancel = () => {
        if (formRef.current && formRef.current.handleCancel) {
            formRef.current.handleCancel(); // Fixed method check
        } else {
            onCancel();
        }
    };

    // Modal Footer Actions
    const customFooter = (
        <div key="footer" className="modal-footer">
            <Button
                key="cancel"
                onClick={handleModalCancel}
                icon={<CloseCircleOutlined />}
                style={{ marginRight: '8px' }}
            >
                Close
            </Button>
            <Button
                key="submit"
                type="primary"
                onClick={handleSubmit}
                icon={initialValues ? <EditFilled /> : <FileAddFilled />}
                style={{ marginLeft: '8px' }}
            >
                {initialValues ? 'Update Matrix' : 'Add Matrix'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Compliance Matrix' : 'Add New Compliance Matrix'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            data={{ customData: 'example' }}
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Compliance Matrix', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditComplianceMatrixForm
                    ref={formRef}
                    // Pass initial values, ensuring required fields have defaults
                    initialValues={{
                        itemNumber: initialValues?.itemNumber || '', // Ensure required field has default value
                        details: initialValues?.details || '',
                        departmentId: initialValues?.departmentId || '',
                        sections: initialValues?.sections || [],
                        ...initialValues,
                    }}
                    onSubmit={onSubmit} // Now expects Partial type
                    onCancel={onCancel}
                    context={context} // Added context
                />
            </div>
        </CustomModal>
    );
};

export default AddEditComplianceMatrixFormModal;
