import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Input, Button } from 'antd';
import styled from 'styled-components';
import PlateModal from './Components/PlateModal';
import EditPlateModal from './Components/EditPlateModal';
import useAuth from '../../hooks/useAuth';
import AlertModal from './Components/ModalAlert'

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

const Plates = () => {
  const user = useAuth()
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPlateId, setSelectedPlateId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plates`);
        console.log('Dados retornados:', response.data); // Adicione isso para depuração
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Erro ao buscar as chapas:', error);
        alert('Erro ao carregar dados. Por favor, tente novamente.');
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(item =>
        item.rotulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.codigo_saef.toLowerCase().includes(searchTerm.toLowerCase()) 
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditModalVisible(false);
    setDeleteModalVisible(false);
  };

  const handleSave = async () => {
    try {
      // Fetch the updated list of solicitations after saving a new one
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/plates`);
      setData(response.data);
      setFilteredData(response.data); // Ensure filtered data is updated
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erro ao atualizar as chapas:', error);
    }
  };

  const handleEdit = (plateId) => {
    setSelectedPlateId(plateId);
    setEditModalVisible(true);
  };

  const handleDelete = (plateId) => {
    setSelectedPlateId(plateId);
    setDeleteModalVisible(true);
  }

  return (
    <Container>
      <StyledTableContainer>
        <ButtonContainer>
          <Button
            type="primary"
            onClick={showModal}
          >
            Criar Chapa
          </Button>
          <SearchInput
            placeholder="Buscar"
            onChange={handleSearchChange}
            value={searchTerm}
          />
        </ButtonContainer>
        <Table
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
            title="Rotulo"
            dataIndex="rotulo"
            key="rotulo"
            align="center"
          />
            <Column
            title="Descrição"
            dataIndex="descricao"
            key="descricao"
            align="center"
          />
          <Column
            title="Código SAEF" 
            dataIndex="codigo_saef"
            key="codigo_saef"
            align="codigo_saef"
          />
          <Column
            title="Ações"
            key="actions"
            render={(text, record) => (
              <>
                {user?.userType === 'Interno' && <Button onClick={() => handleEdit(record._id)} style={{ marginRight: 8 }} >Editar</Button>}
                {user?.userType === 'Interno' && <Button type='primary' danger onClick={() => handleDelete(record._id)}>Deletar</Button>}
              </>
            )}
            align="center"
          />
        </Table>
        <PlateModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onSave={handleSave}
        />
        <EditPlateModal
          visible={editModalVisible}
          onCancel={handleCancel}
          onSave={handleSave}
          plateId={selectedPlateId}
        />
        <AlertModal
        visible={deleteModalVisible}
        title={'Deseja deletar o material?'}
        onCancel={handleCancel}
        onSave={handleSave}
        plateId={selectedPlateId}
        />
      </StyledTableContainer>
    </Container>
  );
};

export default Plates;
