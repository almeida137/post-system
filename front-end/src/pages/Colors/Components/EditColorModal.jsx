import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, Row, Col, DatePicker } from 'antd';
import axios from 'axios';
import isEqual from 'lodash/isEqual'; // Usando lodash para comparar objetos


const EditColorModal = ({ visible, onCancel, onSave, colorId }) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (colorId) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/color/${colorId}`)
        .then(response => {
          const data = response.data;
          setInitialValues(data);
          form.setFieldsValue(data);
        })
        .catch(error => {
          console.error('Erro ao carregar solicitação:', error);
        });
    }
  }, [colorId]);

  const handleSave = () => {
    form.validateFields().then(values => {

      const updatedValues = {
        ...initialValues,
        ...values,
      };
      
      if (!isEqual(initialValues, updatedValues)) {
        axios.put(`${import.meta.env.VITE_API_URL}/api/color/${colorId}`, updatedValues)
          .then(() => {
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
      title="Editar Borda"
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
        <Form.Item name="rotulo" label="Rotulo">
          <Input />
        </Form.Item>
        <Form.Item name="descricao" label="Descrição">
          <Input />
        </Form.Item>
        <Form.Item name="codigo_saef" label="Código SAEF">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditColorModal;
