'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/app/component/Layout/MainLayout';

const RegistryTable = dynamic(() => import('../../component/Registry/RegistriesTable'), { ssr: false });

const RegistryPage: React.FC = () => {

    return (
        <MainLayout>
         <RegistryTable />
        </MainLayout>
    );
};

export default RegistryPage;
