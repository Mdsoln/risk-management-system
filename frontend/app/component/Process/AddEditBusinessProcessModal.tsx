import React, { useRef } from 'react';
import CustomModal from '../Modal/CustomModal';
import { Button } from 'antd';
import { EditFilled, FileAddFilled, CloseCircleOutlined } from '@ant-design/icons';
import { BusinessProcessDTO, SimplifiedFundObjectivePojo, SimplifiedDepartmentPojo } from '@/app/types/api';
import AddEditBusinessProcessForm from './AddEditBusinessProcessForm';

interface AddEditBusinessProcessModalProps {
    visible: boolean;
    initialValues?: Partial<BusinessProcessDTO>;
    fundObjectives: SimplifiedFundObjectivePojo[]; // Pass fund objectives
    departments: SimplifiedDepartmentPojo[];       // Pass departments
    onSubmit: (values: BusinessProcessDTO) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
}

const AddEditBusinessProcessModal: React.FC<AddEditBusinessProcessModalProps> = ({
    visible,
    initialValues,
    fundObjectives,
    departments,
    onSubmit,
    onCancel,
    loading,
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
        if (formRef.current) {
            formRef.current.handleCancel();
        } else {
            onCancel();
        }
    };

    // Modal Footer
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
                loading={loading}
                style={{ marginLeft: '8px' }}
            >
                {initialValues ? 'Update Process' : 'Save New Process'}
            </Button>
        </div>
    );

    return (
        <CustomModal
            visible={visible}
            title={initialValues ? 'Edit Business Process' : 'Add New Business Process'}
            onCancel={handleModalCancel}
            footer={customFooter}
            width="65%"
            height="70vh"
            icon={initialValues ? <EditFilled /> : <FileAddFilled />}
            modalType={{ lineOne: 'Business Process', lineTwo: initialValues ? 'Edit' : 'Add' }}
        >
            <div className="scrollable-form">
                <AddEditBusinessProcessForm
                    ref={formRef}
                    initialValues={initialValues}
                    fundObjectives={fundObjectives} // Pass Fund Objectives
                    departments={departments}     // Pass Departments
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    loading={loading}
                    showActionButtons={false}
                />
            </div>
        </CustomModal>
    );
};

export default AddEditBusinessProcessModal;
