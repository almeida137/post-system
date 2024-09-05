import React, { useState, useEffect } from 'react';
import { Modal, Table, Tooltip, notification, Button, Typography } from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import useAuth from '../../../hooks/useAuth';
const { Text } = Typography;

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`;

const { Column } = Table;

const ItemDetailsModal = ({ visible, onCancel, solicitationId }) => {
    const user = useAuth();
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        if (visible && solicitationId) {
            axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${solicitationId}`)
                .then(response => {
                    setOrder(response.data);
                    setItems(response.data.itens || []);
                })
                .catch(error => {
                    console.error('API Error:', error);
                });
        }
    }, [visible, solicitationId]);

    const handleFileDownload = (anexo) => {
        // Apenas abra o URL do Imgur em uma nova aba
        window.open(anexo, '_blank');
    };

    const handleGeneratePDF = (item) => {
        const doc = new jsPDF();
        // Adicionando os dados do item ao PDF
        doc.setFontSize(12);
        doc.text(`${order.cliente}`, 2, 5);
        doc.text(`${item.ambiente}`, 2, 10);
        doc.text(`${item.descricao}`, 2, 15);
        doc.text(`${item.descricao} - ${item.dimensoes.largura}X${item.dimensoes.altura}X${item.dimensoes.profundidade}`, 2, 20);
        doc.text('.', 2, 25);
        doc.text(`${item.cor}`, 2, 30);
        doc.text(`${order.loja}`, 2, 35);
        doc.text(`${item.dimensoes.largura}X${item.dimensoes.altura}X${item.dimensoes.profundidade}`, 2, 40);
        // Salva o PDF com o nome do pedido
        doc.save(`Detalhes_Pedido_${item.ambiente}.pdf`);
    };

    const hasPintura = items.some(item => item.cor === 'LAVANDA');

    return (
        <StyledModal
            title="Detalhes dos Itens"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={1400} // Ajuste o valor conforme necessário
        >
            <Table
                dataSource={items}
                rowKey="ambiente"
                pagination={false}
                scroll={{ x: 'max-content' }} // Adiciona rolagem horizontal se necessário
            >
                <Column title="Ambiente" dataIndex="ambiente" key="ambiente" />
                <Column title="Qtd" dataIndex="quantidade" key="quantidade" />
                <Column title="Descrição" dataIndex="descricao" key="descricao" />
                <Column
                    title="Dimensões"
                    dataIndex="dimensoes"
                    key="dimensoes"
                    render={(dimensoes) => {
                        if (dimensoes && dimensoes.largura !== undefined && dimensoes.altura !== undefined && dimensoes.profundidade !== undefined) {
                            return `${dimensoes.largura}X${dimensoes.altura}X${dimensoes.profundidade}`;
                        }
                        return 'Dados não disponíveis';
                    }}
                />
                {hasPintura ? (
                    <Column title="Cor Pintura" dataIndex="cor_pintura" key="cor_pintura" />
                ) :
                    <Column title="Cor" dataIndex="cor" key="cor" />
                }
                {hasPintura ? (
                    <Column title="Cor Pintura Borda" dataIndex="cor_borda_pintura" key="cor_borda_pintura" />
                ) :
                    <Column title="Cor Borda" dataIndex="cor_borda" key="cor_borda" />
                }
                <Column title="Motivo" dataIndex="motivo" key="motivo" />
                <Column
                    width={100}
                    title="Observação"
                    dataIndex="obs"
                    key="obs"
                    render={text => (
                        <Tooltip title={text}>
                            <div style={{
                                width: '200px', // Largura fixa para a coluna
                                overflow: 'hidden', // Oculta o texto que ultrapassa o limite
                                textOverflow: 'ellipsis', // Adiciona reticências para indicar que o texto foi cortado
                                whiteSpace: 'nowrap', // Impede que o texto quebre a linha
                            }}>
                                <Text ellipsis>{text}</Text>
                            </div>
                        </Tooltip>
                    )}
                />
                <Column
                    title="Anexos"
                    key="anexos"
                    render={(text, record) => (
                        <div>
                            {record.anexos && record.anexos.length > 0 ? (
                                record.anexos.map((anexo, index) => (
                                    <div key={index}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleFileDownload(anexo);
                                            }}
                                        >
                                            Baixar {index + 1}
                                        </a>
                                    </div>
                                ))
                            ) : (
                                'Nenhum anexo'
                            )}
                        </div>
                    )}
                />
                {user?.userType === 'Interno' && (
                    <Column
                        title='Etiqueta'
                        render={(text, record) => (
                            <Button type='primary' onClick={() => handleGeneratePDF(record)}>
                                Gerar
                            </Button>
                        )}
                    />
                )}
            </Table>
        </StyledModal>
    );
};

export default ItemDetailsModal;
