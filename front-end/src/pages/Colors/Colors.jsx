import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Button } from 'antd';
import styled from 'styled-components';
import ColorModal from './Components/ColorModal';
import EditColorModal from './Components/EditColorModal';
import useAuth from '../../hooks/useAuth';
import AlertModal from './Components/ModalAlert';

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

const Color = () => {
  const user = useAuth();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/color`);
        console.log('Dados retornados:', response.data); // Adicione isso para depuração
        
        // Extrair dados de brandName e color
        const extractedColors = response.data.flatMap(item =>
          item.brands.flatMap(brand =>
            brand.colors.map(color => ({
              brandName: brand.brandName,
              colorName: color.name,
              colorCode: color.code,
              _id: color._id
            }))
          )
        );
        
        setData(extractedColors);
        setFilteredData(extractedColors);
      } catch (error) {
        console.error('Erro ao buscar as cores:', error);
        alert('Erro ao carregar dados. Por favor, tente novamente.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter(item =>
        (item.colorName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.colorCode ?? '').toLowerCase().includes(searchTerm.toLowerCase())
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
      // Fetch the updated list of colors after saving a new one
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/color`);
      
      // Extrair dados de brandName e color
      const extractedColors = response.data.flatMap(item =>
        item.brands.flatMap(brand =>
          brand.colors.map(color => ({
            brandName: brand.brandName,
            colorName: color.name,
            colorCode: color.code,
            _id: color._id
          }))
        )
      );

      setData(extractedColors);
      setFilteredData(extractedColors); // Ensure filtered data is updated
      setIsModalVisible(false);
    } catch (error) {
      console.error('Erro ao atualizar as cores:', error);
    }
  };

  const handleEdit = (colorId) => {
    setSelectedColorId(colorId);
    setEditModalVisible(true);
  };

  const handleDelete = (colorId) => {
    setSelectedColorId(colorId);
    setDeleteModalVisible(true);
  };

  return (
    <Container>
      <StyledTableContainer>
        <ButtonContainer>
          <Button
            type="primary"
            onClick={showModal}
          >
            Criar Cor
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
            title="Marca"
            dataIndex="brandName"
            key="brandName"
            align="center"
          />
          <Column
            title="Nome"
            dataIndex="colorName"
            key="colorName"
            align="center"
          />
          <Column
            title="Código"
            dataIndex="colorCode"
            key="colorCode"
            align="center"
          />
          <Column
            title="Ações"
            key="actions"
            render={(text, record) => (
              <>
                {user?.userType === 'Interno' && <Button onClick={() => handleEdit(record._id)} style={{ marginRight: 8 }}>Editar</Button>}
                {user?.userType === 'Interno' && <Button type='primary' danger onClick={() => handleDelete(record._id)}>Deletar</Button>}
              </>
            )}
            align="center"
          />
        </Table>
        <ColorModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onSave={handleSave}
        />
        <EditColorModal
          visible={editModalVisible}
          onCancel={handleCancel}
          onSave={handleSave}
          colorId={selectedColorId}
        />
        <AlertModal
          visible={deleteModalVisible}
          title={'Deseja deletar a cor?'}
          onCancel={handleCancel}
          onSave={handleSave}
          // brandId={selectedBrandId}
          colorId={selectedColorId}
        />
      </StyledTableContainer>
    </Container>
  );
};

export default Color;
