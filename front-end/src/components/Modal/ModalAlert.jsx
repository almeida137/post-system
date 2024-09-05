import { Button, Modal } from 'antd';
import React from 'react';
import styled from 'styled-components';
import WarningIcon from './assets/warning.png'


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

const AlertModal = ({ title, visible, onConfirm, onCancel }) => {
  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      footer={
        <CustomFooter>
          <Button key="cancel" onClick={onCancel}>
            Cancelar
          </Button>
          <Button key="confirm" type="primary" onClick={onConfirm}>
            Confirmar
          </Button>
        </CustomFooter>
      }
      centered
    >
      <ModalHeader>
        <img src={WarningIcon} alt="" style={{ fontSize: '24px', width:'30%'}}/>
        {/* <ExclamationCircleOutlined  /> */}
      </ModalHeader>
      <ModalTitle>
        {title}
      </ModalTitle>
      {/* Conteúdo do Modal pode ser passado aqui */}
    </StyledModal>
  );
};

export default AlertModal;
