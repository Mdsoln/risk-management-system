import React from 'react';
import { Table, TablePaginationConfig, Button, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import ErrorAlert from '../Alert/ErrorAlert';
import ErrorModal from '../Modal/ErrorModal';
import styles from './ReusableTable.module.css'; // Import CSS module
import { PaginationResult } from '@/app/types/api';

interface TableItem {
    id: string;
    // Add any other properties that are common across your table items
}

interface ReusableTableProps<T extends TableItem> {
    columns: any[];
    tableKey: keyof T;
    fetchTableData: (page: number, pageSize: number) => Promise<PaginationResult<T>>;
    size?: 'large' | 'middle' | 'small'; // Add size prop with large, middle, and small options
    expandable?: any; // Support expandable rows
    scroll?: { x?: number | string; y?: number | string }; // Allow y to be number or string
}

const ReusableTable = <T extends TableItem>({ columns, tableKey, fetchTableData, expandable, size = 'middle', scroll }: ReusableTableProps<T>) => {
    const [data, setData] = React.useState<T[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [pagination, setPagination] = React.useState({ current: 1, pageSize: 10, total: 0, totalPages: 0 });
    const [error, setError] = React.useState<string | null>(null);
    const [errorModalVisible, setErrorModalVisible] = React.useState(false);
    const [reloadLoading, setReloadLoading] = React.useState(false); // Add state for reload button
    const initialFetchRef = React.useRef(true);

    const fetchData = async (page: number = 1, pageSize: number = 10) => {
        setLoading(true);
        setError(null); // Reset error before fetching data
        try {
            const result = await fetchTableData(page, pageSize);
            setData(result.items);
            setPagination({
                current: result.currentPage,
                pageSize: result.pageSize,
                total: result.totalItems,
                totalPages: result.totalPages, // Add totalPages here
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred while fetching data.');
            setErrorModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        if (initialFetchRef.current) {
            fetchData(pagination.current, pagination.pageSize);
            initialFetchRef.current = false;
        }
    }, []);

    const handleTableChange = (pagination: TablePaginationConfig) => {
        fetchData(pagination.current!, pagination.pageSize!);
    };

    const handleReload = async () => {
        setReloadLoading(true);
        await fetchData(pagination.current, pagination.pageSize);
        setReloadLoading(false);
    };

    return (
        <div>
            <Space style={{ marginBottom: 16 }}>
                <Button type="text" onClick={handleReload}>
                    <ReloadOutlined className={reloadLoading ? styles.rotate : ''} />
                    Reload
                </Button>
            </Space>
            <ErrorAlert message={error!} visible={!!error} />
            <ErrorModal
                title="Data Fetch Error"
                content="An error occurred while fetching data. Please try again later."
                visible={errorModalVisible}
                onClose={() => setErrorModalVisible(false)}
            />
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    showTotal: (total, range) => `Total ${total} items, ${pagination.totalPages} pages`, // Show total items and total pages
                }}
                loading={loading}
                onChange={handleTableChange}
                rowKey={(record) => record[tableKey] as React.Key}
                expandable={expandable} // Support expandable rows
                size={size} // Apply size prop
                scroll={scroll} // Apply scroll prop dynamically
            />
        </div>
    );
};

export default ReusableTable;
