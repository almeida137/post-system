import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Button } from 'antd';
import axios from 'axios';
import styled from 'styled-components';

const CustomFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    width: 600px;
  }
`;

const ModalDetails = ({ visible, onCancel, apiUrl, itemId, title }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (itemId) {
      axios.get(`${import.meta.env.VITE_API_URL}/${apiUrl}/${itemId}`)
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar os detalhes:', error);
        });
    }
  }, [apiUrl, itemId]);

  return (
    <StyledModal
      visible={visible}
      onCancel={onCancel}
      footer={
        <CustomFooter>
          <Button key="close" onClick={onCancel}>
            Fechar
          </Button>
        </CustomFooter>
      }
      centered
      title={title}
    >
      {data ? (
        <Descriptions bordered column={1}>
          {Object.keys(data).map(key => (
            <Descriptions.Item label={key} key={key}>
              {data[key]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      ) : (
        <p>Carregando...</p>
      )}
    </StyledModal>
  );
};

export default ModalDetails;
