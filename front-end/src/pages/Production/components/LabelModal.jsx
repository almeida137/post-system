import React, { useState, useEffect } from 'react';
import { Modal, Table, Tooltip, notification, Button } from 'antd';
import axios from 'axios';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`;

const { Column } = Table;

const LabelModal = ({ visible, onCancel, solicitationId }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (visible && solicitationId) {
            axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${solicitationId}`)
                .then(response => {
                    setItems(response.data.itens || []);
                })
                .catch(error => {
                    console.error('API Error:', error);
                });
        }
    }, [visible, solicitationId]);

    return (
        <StyledModal
            title="Gerar Etiquetas das Peças"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={1200}
        >
            <Table
                dataSource={items}
                rowKey="pedido"
                pagination={false}
                scroll={{ x: 'max-content' }} // Adiciona rolagem horizontal se necessário
            >
                <Column title="Pedido" dataIndex="pedido" key="pedido" />
                <Column title="Quantidade" dataIndex="quantidade" key="quantidade" />
                <Column title="Dimensões" dataIndex="dimensoes" key="dimensoes" />
                <Column title="Cor" dataIndex="cor" key="cor" />
                <Column title="Motivo" dataIndex="motivo" key="motivo" />
                <Column
                    width={350}
                    title="Observação"
                    dataIndex="obs"
                    key="obs"
                    render={text => (
                        <Tooltip title={text}>
                            <div style={{
                                whiteSpace: 'pre-wrap', // Mantém as quebras de linha
                                wordWrap: 'break-word', // Quebra palavras longas
                                overflowWrap: 'break-word', // Quebra palavras longas no caso de overflow
                                maxWidth: '100%', // Garante que o texto não ultrapasse a coluna
                                wordBreak: 'break-word' // Quebra palavras longas
                            }}>
                                {text}
                            </div>
                        </Tooltip>
                    )}
                />
                <Column
                    title="Etiqueta"
                    key="anexos"
                    render={(text, record) => (
                       <div>
                        
                       </div>
                    )}
                />
            </Table>
        </StyledModal>
    );
};

export default LabelModal;
