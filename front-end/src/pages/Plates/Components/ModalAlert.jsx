import { Button, Modal, notification } from 'antd';
import React from 'react';
import styled from 'styled-components';
import WarningIcon from './assets/warning.png'
import axios from 'axios';

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CustomFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 300px; 
    margin: 0 auto;
  }
`;

const AlertModal = ({ title, visible, onCancel, onSave, plateId }) => {

  const handleConfirm = async (plateId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/plates/${plateId}`);

      if (response.status === 200) {
        notification.success({
          message: 'Chapa apagada com sucesso!',
          notification: 'Chapa Apagada!'
        });
        onSave();
        onCancel(); 
      } else {
        notification.error({
          message: 'Falha ao apagar a Chapa.',
          notification: 'Falha ao apagar a Chapa!'
        });
      }
    } catch (error) {
      console.error('Erro ao apagar Chapa:', error);
      notification.error({
        message: 'Erro ao apagar Chapa. Tente novamente mais tarde.',
        notification: 'Erro ao apagar Chapa. Tente novamente mais tarde.'
      });
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
          <Button key="confirm" type="primary" onClick={() => handleConfirm(plateId)}>
            Confirmar
          </Button>
        </CustomFooter>
      }
      centered
    >
      <ModalHeader>
        <img src={WarningIcon} alt="" style={{ fontSize: '24px', width: '30%' }} />
      </ModalHeader>
      <ModalTitle>
        {title}
      </ModalTitle>
    </StyledModal>
  );
};

export default AlertModal;
