import React from 'react';
import { Layout } from 'antd';

const { Sider, Content } = Layout;

const LayoutPage = () => {
    return (
        <Layout style={{ minHeight: '90vh' }}>
            <Layout>
                <Content style={{ padding: '15px', minHeight: '80vh' }}>
                    {/* Seu conteúdo do Content */}
                    <div style={{ background: '#fff', padding: '24px', minHeight: '90vh' }}>Content</div>
                </Content>
            </Layout>
            <Sider width="15%" style={{ background: '#fff', minHeight: '80vh' }}>
                {/* Seu conteúdo do Sider */}
                <div style={{ padding: '15px' }}>Sider</div>
            </Sider>

        </Layout>
    );
};

export default LayoutPage;
