import React, { useState, useEffect, useCallback } from 'react';
import { Table, Tooltip, message } from 'antd';
import { FundObjective, FundObjectivePojo, ApiResponse, ErrorState } from '@/app/types/api';
import { BarsOutlined } from '@ant-design/icons';
import DisplayTitle from '../Display/DisplayTitle';
import FundObjectiveOnlyDetail from './FundObjectiveOnlyDetail'; // Import the new component
import { getFundObjectiveById } from '@/app/services/api/fundObjectiveApi';
import { convertPojoToFundObjective } from '@/app/utils/converters';

interface FundObjectiveViewDetailProps {
    viewData: FundObjective | null;
    refreshData: () => void; // Function to refresh the data after update
}

const FundObjectiveViewDetail: React.FC<FundObjectiveViewDetailProps> = ({ viewData, refreshData }) => {
    const [errorState, setErrorState] = useState<ErrorState>({
        message: null,
        description: null,
        errors: null,
        refId: null,
    }); // Consolidated error state

    const [currentData, setCurrentData] = useState<FundObjective | null>(viewData);

    const refreshViewData = useCallback(async () => {
        if (viewData?.id) {
            try {
                const updatedPojo = await getFundObjectiveById(viewData.id);
                // Convert FundObjectivePojo to FundObjective before setting state
                const convertedData = convertPojoToFundObjective(updatedPojo, currentData);
                setCurrentData(convertedData);
            } catch (error) {
                message.error('Failed to fetch updated data');
                console.error('Error fetching updated data:', error);
            }
        }
    }, [viewData, currentData]);

    useEffect(() => {
        if (viewData) {
            setCurrentData(viewData);
        }
    }, [viewData]);

    if (!currentData) {
        return <div>No data available</div>;
    }

    const businessProcessColumns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (
                <Tooltip title={text}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                        {text}
                    </div>
                </Tooltip>
            ),
        },
    ];

    return (
        <div>
            <FundObjectiveOnlyDetail viewData={currentData} refreshData={refreshViewData} />
            <DisplayTitle text="Business Processes" icon={<BarsOutlined />} />
            <Table
                dataSource={currentData.businessProcess}
                columns={businessProcessColumns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default FundObjectiveViewDetail;
