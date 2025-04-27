'use client';

import React from 'react';
import { Layout, Row, Col, Card, Tabs } from 'antd';
import SideNav from './component/SideNav/SideNav';
import HeaderLayout from './component/Header/HeaderLayout';
import StatisticsSection from './component/Dashboard/StatisticsSection';
import AssetRegisterTable from './component/Dashboard/AssetRegisterTable';
import ChartsSection from './component/Dashboard/ChartsSection';
import AggregatedInherentRisk from './component/Dashboard/AggregatedInherentRisk';
import AggregatedResidualRisk from './component/Dashboard/AggregatedResidualRisk';
import styles from '../styles/Home.module.css';
import RiskActionPlanTableReport from './component/Dashboard/RiskActionPlanTableReport';

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const Home: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sider width={250} style={{ background: '#fff' }}>
        <SideNav />
      </Sider>

      {/* Main Layout */}
      <Layout className={styles.layout}>
        {/* Header */}
        <HeaderLayout />

        {/* Main Content */}
        <Content style={{ padding: '24px', flex: 1, marginTop: '50px', marginLeft: '20px' }}>
          {/* Wrap Tabs inside Card */}
          <Tabs defaultActiveKey="1">
            <TabPane tab="Dashboard" key="1">
              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <StatisticsSection />
                  {/* <AssetRegisterTable /> */}
                  <RiskActionPlanTableReport />
                  <ChartsSection />
                </Col>
                <Col span={8}>
                  <AggregatedInherentRisk />
                  <div style={{ marginTop: '10px' }}>
                    <AggregatedResidualRisk />
                  </div>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab="Risk Category Dashboard" key="2">
              {/* Add content related to Risk Category Dashboard */}
              <div>Risk Category Dashboard Content</div>
            </TabPane>

            <TabPane tab="Top Risks" key="3">
              {/* Add content related to Top Risks */}
              <div>Top Risks Content</div>
            </TabPane>

            <TabPane tab="Risk Effectiveness" key="4">
              {/* Add content related to Risk Effectiveness */}
              <div>Risk Effectiveness Content</div>
            </TabPane>

            <TabPane tab="Risk Register" key="5">
              {/* Add content related to Risk Register */}
              <div>Risk Register Content</div>
            </TabPane>

            <TabPane tab="Report" key="6">
              {/* Add content related to Report */}
              <div>Report Content</div>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;