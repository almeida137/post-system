import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import LabelModal from './components/LabelModal';

const { Column } = Table;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1px;
`;

const StyledTableContainer = styled.div`
  flex: 4;
  max-width: 100%;
  margin-left: 1px;
  margin-top: 1px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ButtonContainer = styled.div`
  flex: 1;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding-left: 10px;
`;

const SearchInput = styled(Input)`
  margin-bottom: 16px;
  width: 50%;
`;

const Production = () => {
    const user = useAuth();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [searchTerm, setSearchTerm] = useState('');
    const [labelModalVisible, setLabelModalVisible] = useState(false)
    const [selectedSolicitationId, setSelectedSolicitationId] = useState(null);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/orders`)
            .then(response => {
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    }, []);

    useEffect(() => {
        setFilteredData(
            data.filter(item =>
                item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.montador.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.motivoGeral.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.status.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setPage(1); // Reset page when search changes
    }, [searchTerm, data]);

    useEffect(() => {
        const handleResize = () => {
            setPageSize(calculatePageSize());
        };

        window.addEventListener('resize', handleResize);
        setPageSize(calculatePageSize());

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const calculatePageSize = () => {
        const tableHeight = window.innerHeight - 50;
        const rowHeight = 70;
        return Math.floor(tableHeight / rowHeight);
    };

    const handlePageChange = (current, pageSize) => {
        setPage(current);
        setPageSize(pageSize);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };

    const handleLabel = (solicitationId) => {
        setSelectedSolicitationId(solicitationId);
        setLabelModalVisible(true);
    };
    const handleCancel = () => {
        setLabelModalVisible(false);
      };
    return (
        <Container>
            <StyledTableContainer>
                <ButtonContainer>
                    <Button type='primary'>Gerar Cortes</Button>
                    <SearchInput
                        placeholder="Buscar"
                        onChange={handleSearchChange}
                        value={searchTerm}
                    />
                </ButtonContainer>
                <Table
                    rowSelection={{
                        selectedRowKeys: selectedRowKeys,
                        onChange: handleSelectChange,
                        type: 'checkbox'
                    }}
                    dataSource={filteredData}
                    rowKey="_id"
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: filteredData.length,
                        onChange: handlePageChange,
                    }}
                    style={{ textAlign: 'center' }}
                >
                    <Column
                        title="Data do Pedido"
                        dataIndex="dataDoPedido"
                        key="dataDoPedido"
                        render={text => new Date(text).toLocaleDateString()}
                        align="center"
                    />
                    <Column
                        title="Loja"
                        dataIndex="loja"
                        key="loja"
                        align="center"
                    />
                    <Column
                        title="Cliente"
                        dataIndex="cliente"
                        key="cliente"
                        align="center"
                    />
                    <Column
                        title="Motivo Geral"
                        dataIndex="motivoGeral"
                        key="motivoGeral"
                        align="center"
                    />
                    <Column
                        title="Status"
                        dataIndex="status"
                        key="status"
                        align="center"
                    />
                    <Column
                        title="Itens"
                        key="itens"
                        render={(text, record) => record.itens.length}
                        align="center"
                    />
                    <Column
                        title="Ações"
                        key="actions"
                        render={(text, record) => (
                            <>
                                <Button onClick={() => handleLabel(record._id)} style={{ marginRight: 8 }}>
                                    Etiquetas
                                </Button>
                            </>
                        )}
                        align="center"
                    />
                </Table>
                <LabelModal
                visible={labelModalVisible}
                onCancel={handleCancel}
                solicitationId={selectedSolicitationId}
                />
            </StyledTableContainer>
        </Container>
    );
};

export default Production;
