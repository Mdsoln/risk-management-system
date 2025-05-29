'use client';

import React from 'react';
import MainLayout from '@/app/component/Layout/MainLayout';
import BusinessProcessTable from '@/app/component/Process/BusinessProcessTable';

const BusinessProcessPage: React.FC = () => (
    <MainLayout>
        <BusinessProcessTable />
    </MainLayout>
);

export default BusinessProcessPage;