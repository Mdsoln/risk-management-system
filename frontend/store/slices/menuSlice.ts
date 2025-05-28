// menuSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
    key: string;
    label: string;
    iconKey?: string; // Use a string identifier for the icon
    children?: MenuItem[];
}

interface MenuState {
    menuItems: MenuItem[];
    selectedKeys: string[];
    openKeys: string[];
}

const initialState: MenuState = {
    menuItems: [
        {
            key: 'dashboard',
            label: 'Dashboard',
            iconKey: 'DashboardOutlined',
            children: [
                {
                    key: 'sub-dashboard',
                    label: 'Sub Dashboard',
                    children: [
                        { key: 'sub-sub-dashboard', label: 'Sub Sub Dashboard' },
                    ],
                },
            ],
        },
        {
            key: 'risk-menu',
            label: 'Risk Management',
            iconKey: 'UserOutlined',
            children: [
                { key: 'risk-management/fund-objective', label: 'Fund Objective' },
                { key: 'risk-management/business-process', label: 'Business Process' },
                { key: 'risk-management/risk', label: 'Risk' },
                { key: 'risk-management/registry', label: 'Risk Registry' },
            ],
        },
        // {
        //     key: 'compliance-menu',
        //     label: 'Compliance',
        //     iconKey: 'FileDoneOutlined',
        //     children: [
        //         { key: 'compliance/dashboard', label: 'Dashboard' },
        //         {
        //             key: 'compliance/directorate-policies', label: 'Directorate/Unit Policies', children: [
        //                 { key: 'compliance/directorate/operations-manual', label: 'Operations Manual' },
        //                 { key: 'compliance/directorate/customer-service-charter', label: 'Customer Service Charter' },
        //                 { key: 'compliance/directorate/customer-service-policy', label: 'Customer Service Policy' },
        //                 { key: 'compliance/directorate/security-act', label: 'Social Security Act' },
        //             ]
        //         },
        //         {
        //             key: 'compliance/other-policies', label: 'Other Directorate Policies', children: [
        //                 { key: 'compliance/other/staff-charter', label: 'Staff Charter' },
        //                 { key: 'compliance/other/financial-policies', label: 'Financial Policies' },
        //             ]
        //         },
        //         {
        //             key: 'compliance/regulations', label: 'Regulations and Policies', children: [
        //                 { key: 'compliance/regulations/data-management', label: 'Data Management' },
        //                 { key: 'compliance/regulations/membership', label: 'Membership Guidelines' },
        //                 { key: 'compliance/regulations/totalization', label: 'Totalization Guidelines' },
        //             ]
        //         },
        //         {
        //             key: 'compliance/service-providers', label: 'Service Providers', children: [
        //                 { key: 'compliance/service/nida', label: 'National Identification Authority' },
        //                 { key: 'compliance/service/rita', label: 'RITA' },
        //             ]
        //         },
        //         { key: 'compliance/government-authorities', label: 'Government Authorities' },
        //         { key: 'compliance/circulars', label: 'Circulars and Directives' },
        //         { key: 'compliance/international-standards', label: 'International Standards' },
        //         { key: 'compliance/contracts', label: 'Fund Contracts' },
        //         {
        //             key: 'compliance/directorate-policies', label: 'Directorate/Unit Policies', children: [
        //                 { key: 'compliance/directorate/operations-manual', label: 'Operations Manual' },
        //                 { key: 'compliance/directorate/customer-service-charter', label: 'Customer Service Charter' },
        //                 { key: 'compliance/directorate/customer-service-policy', label: 'Customer Service Policy' },
        //                 { key: 'compliance/directorate/security-act', label: 'Social Security Act' },
        //             ]
        //         },
        //         {
        //             key: 'compliance/other-policies', label: 'Other Directorate Policies', children: [
        //                 { key: 'compliance/other/staff-charter', label: 'Staff Charter' },
        //                 { key: 'compliance/other/financial-policies', label: 'Financial Policies' },
        //             ]
        //         },
        //         {
        //             key: 'compliance/regulations', label: 'Regulations and Policies', children: [
        //                 { key: 'compliance/regulations/data-management', label: 'Data Management' },
        //                 { key: 'compliance/regulations/membership', label: 'Membership Guidelines' },
        //                 { key: 'compliance/regulations/totalization', label: 'Totalization Guidelines' },
        //             ]
        //         },
        //         {
        //             key: 'compliance/service-providers', label: 'Service Providers', children: [
        //                 { key: 'compliance/service/nida', label: 'National Identification Authority' },
        //                 { key: 'compliance/service/rita', label: 'RITA' },
        //             ]
        //         },
        //         { key: 'compliance/government-authorities', label: 'Government Authorities' },
        //         { key: 'compliance/circulars', label: 'Circulars and Directives' },
        //         { key: 'compliance/international-standards', label: 'International Standards' },
        //         { key: 'compliance/contracts', label: 'Fund Contracts' },
        //     ],
        // },
        {
            key: 'compliance-menu',
            label: 'Compliance',
            iconKey: 'FileDoneOutlined',
            children: [
                { key: 'compliance/compliance-document', label: 'Compliance Document' },
                { key: 'compliance/compliance-document-category', label: 'Document Category' },
                { key: 'compliance/compliance-entity', label: 'Compliance Entity' },
                { key: 'compliance/compliance-entity-category', label: 'Entity Category' },
                { key: 'compliance/regulatory-compliance-matrix', label: 'Compliance Matrix Report' },
            ],
        },

        //Business Continuity Management (BCM)

        {
            key: 'bcm-menu',
            label: 'BCM',
            iconKey: 'UserOutlined',
            children: [
                { key: 'bcm/bcm-battle-box-item', label: 'Battle Box Items' },
                { key: 'bcm/bcm-damage-assessment', label: 'Damage Assessment' },
                { key: 'bcm/bcm-dependency', label: 'Dependency' },
                { key: 'bcm/bcm-impact-assessment', label: 'Impact Assessment' },
                {
                    key: 'bcm/phone',
                    label: 'Phone',
                    children: [
                        { key: 'bcm/bcm-phone-directory', label: 'Phone Directory' },
                        { key: 'bcm/bcm-phone-list', label: 'Phone List' },
                    ],
                },
                { key: 'bcm/bcm-process', label: 'Process' },
                { key: 'bcm/bcm-resource-acquisition', label: 'Resource Acquisition' },
                { key: 'bcm/bcm-staff', label: 'Staff' },
                { key: 'bcm/bcm-sub-process', label: 'Sub-Process' },
                { key: 'bcm/bcm-supplier', label: 'Supplier' },
                { key: 'bcm/bcm-system-listing-form', label: 'System Listing Form' },
                { key: 'bcm/bcm-urgent-resource', label: 'Urgent Resource' },
                { key: 'bcm/status-report', label: 'Status Report' },
            ],
        },

    ],
    selectedKeys: [],
    openKeys: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setSelectedKeys: (state, action: PayloadAction<string[]>) => {
            state.selectedKeys = action.payload;
        },
        setOpenKeys: (state, action: PayloadAction<string[]>) => {
            state.openKeys = action.payload;
        },
    },
});

export const { setSelectedKeys, setOpenKeys } = menuSlice.actions;
export default menuSlice.reducer;
