import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Input, Modal, Form, Select } from 'antd';

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const FormGroup = styled.div`
  flex: 1;
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const CustomFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 800px;
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;
  .ant-select-selector {
    height: 40px; /* Ajuste a altura conforme necessário */
    line-height: 40px; /* Ajuste a altura da linha conforme necessário */
  }
  .ant-select-selection-placeholder {
    line-height: 40px; /* Ajuste a altura da linha do placeholder conforme necessário */
  }
`;

const PlateModal = ({ visible, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    rotulo: '',
    descricao: '',
    codigo_saef: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = async () => {
    const plateData = {
        rotulo: formData.rotulo,
        descricao: formData.descricao,
        codigo_saef: formData.codigo_saef,
    };

    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/plates`, plateData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setFormData({
            rotulo: '',
            descricao: '',
            codigo_saef: '',
        });
        onSave();
    } catch (error) {
        console.error('Erro ao criar chapa:', error);
    }
};

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      footer={
        <CustomFooter>
          <Button key="cancel" onClick={onCancel}>
            Cancelar
          </Button>
          <Button key="save" type="primary" onClick={handleSubmit} style={{marginLeft: 5}}>
            Salvar
          </Button>
        </CustomFooter>
      }
      centered
      title="Cadastrar Chapa"
    >
      <FormContainer>
        <Form onSubmitCapture={(e) => e.preventDefault()}>
          <FormRow>
            <FormGroup>
              <FormLabel>Rotulo:</FormLabel>
              <StyledInput type="text" name="rotulo" value={formData.rotulo} onChange={handleChange} required />
            </FormGroup>

            <FormGroup>
              <FormLabel>Código SAEF:</FormLabel>
              <StyledInput type="text" name="codigo_saef" value={formData.codigo_saef} onChange={handleChange} required />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <FormLabel>Descrição:</FormLabel>
              <StyledInput type="text" name="descricao" value={formData.descricao} onChange={handleChange} required />
            </FormGroup>
          </FormRow>
        </Form>
      </FormContainer>
    </StyledModal>
  );
};

export default PlateModal;
