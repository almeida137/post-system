import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, Row, Col, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment'; // Biblioteca para manipulação de datas
import isEqual from 'lodash/isEqual'; // Usando lodash para comparar objetos

const { Option } = Select;

const STATUS_OPTIONS = [
  'Enviado pela Loja',
  'Em Produção',
  'Produção 3CAD',
  'Pedido Vitralle',
  'Concluído'
];

const LOJAS = [
  'Paulete BSB',
  'Paulete GO'
];
const EditSolicitacaoFormModal = ({ visible, onCancel, onSave, solicitationId }) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (solicitationId) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${solicitationId}`)
        .then(response => {
          const data = response.data;
          // Converte a data do formato ISO para o formato Moment.js
          if (data.dataDoPedido) {
            data.dataDoPedido = moment(data.dataDoPedido); // Converte para o formato Moment.js
          }
          setInitialValues(data);
          form.setFieldsValue(data);
        })
        .catch(error => {
          console.error('Erro ao carregar solicitação:', error);
        });
    }
  }, [solicitationId]);

  const handleSave = () => {
    form.validateFields().then(values => {
      // Converte a data do formato Moment.js para o formato ISO para enviar ao backend
      values.dataDoPedido = values.dataDoPedido?.toISOString();

      const updatedValues = {
        ...initialValues,
        ...values,
        itens: values.itens || [] // Garantir que itens não sejam undefined
      };

      // Verifica se houve alterações comparando os valores iniciais com os atuais
      if (!isEqual(initialValues, updatedValues)) {
        axios.put(`${import.meta.env.VITE_API_URL}/api/orders/${solicitationId}`, updatedValues)
          .then(() => {
            // Fechar o modal e executar a função de callback onSave
            onSave();
            onCancel(); // Fechar o modal
          })
          .catch(error => {
            console.error('Erro ao atualizar solicitação:', error);
          });
      } else {
        console.log('Nenhuma alteração detectada.');
        onCancel(); // Fechar o modal sem salvar se não houver alterações
      }
    });
  };

  return (
    <Modal
      visible={visible}
      title="Editar Solicitação"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Salvar
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="dataDoPedido" label="Data do Pedido">
          <DatePicker
            format="DD/MM/YYYY" // Formato de exibição da data
            placeholder="Selecione uma data"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="loja" label="Loja">
          <Select placeholder="Selecione uma loja">
            {LOJAS.map(loja => (
              <Option key={loja} value={loja}>
                {loja}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="cliente" label="Cliente">
          <Input />
        </Form.Item>
        <Form.Item name="montador" label="Montador">
          <Input />
        </Form.Item>
        <Form.Item name="motivoGeral" label="Motivo Geral">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="Status">
          <Select placeholder="Selecione um status">
            {STATUS_OPTIONS.map(status => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {/* Descomente e ajuste o código para exibir os itens, se necessário */}
        {/* {initialValues && initialValues.itens && initialValues.itens.map((item, index) => (
          <div key={index}>
            <h4>Item {index + 1}</h4>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name={`itens[${index}].pedido`} label="Pedido">
                  <Input defaultValue={item.pedido} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={`itens[${index}].quantidade`} label="Quantidade">
                  <Input defaultValue={item.quantidade} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name={`itens[${index}].dimensoes`} label="Dimensões">
                  <Input defaultValue={item.dimensoes} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name={`itens[${index}].cor`} label="Cor">
                  <Input defaultValue={item.cor} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name={`itens[${index}].motivo`} label="Motivo">
              <Input defaultValue={item.motivo} />
            </Form.Item>
            <Form.Item name={`itens[${index}].obs`} label="Observação">
              <Input defaultValue={item.obs} />
            </Form.Item>
          </div>
        ))} */}
      </Form>
    </Modal>
  );
};

export default EditSolicitacaoFormModal;
