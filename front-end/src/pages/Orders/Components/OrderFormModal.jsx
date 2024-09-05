import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Button, Input, Modal, Form, Select } from 'antd';

const { TextArea } = Input;

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

const StyledTextArea = styled(TextArea)`
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

const LOJAS = [
  'Paulete BSB',
  'Paulete GO'
];

const SolicitacaoFormModal = ({ visible, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    loja: '',
    dataDoPedido: '',
    cliente: '',
    montador: '',
    motivoGeral: '',
    itens: [{ ambiente: '', quantidade: '', descricao: '', dimensoes: { altura: '', largura: '', profundidade: '' }, cor: '', cor_borda: '', cor_pintura: '', cor_borda_pintura: '', motivo: '', obs: '', anexos: [] }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItens = formData.itens.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setFormData({
      ...formData,
      itens: newItens
    });
  };

  const handleDimensaoChange = (index, e) => {
    const { name, value } = e.target;
    const newItens = formData.itens.map((item, i) =>
      i === index ? { ...item, dimensoes: { ...item.dimensoes, [name]: value } } : item
    );
    setFormData({
      ...formData,
      itens: newItens
    });
  };

  const handleFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    const newItens = formData.itens.map((item, i) =>
      i === index ? { ...item, anexos: [...item.anexos, ...files] } : item
    );
    setFormData({
      ...formData,
      itens: newItens
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      itens: [...formData.itens, { ambiente: '', quantidade: '', descricao: '', dimensoes: { altura: '', largura: '', profundidade: '' }, cor: '', cor_borda: '', cor_pintura: '', cor_borda_pintura: '', motivo: '', obs: '', anexos: [] }]
    });
  };

  const removeItem = (index) => {
    setFormData({
      ...formData,
      itens: formData.itens.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // Adiciona dados principais
    formDataToSend.append('loja', formData.loja)
    formDataToSend.append('dataDoPedido', formData.dataDoPedido);
    formDataToSend.append('cliente', formData.cliente);
    formDataToSend.append('montador', formData.montador);
    formDataToSend.append('motivoGeral', formData.motivoGeral);

    // Adiciona itens e anexos
    formData.itens.forEach((item, index) => {
      formDataToSend.append(`itens[${index}][ambiente]`, item.ambiente);
      formDataToSend.append(`itens[${index}][quantidade]`, item.quantidade);
      formDataToSend.append(`itens[${index}][descricao]`, item.descricao);
      formDataToSend.append(`itens[${index}][dimensoes][largura]`, item.dimensoes.largura);
      formDataToSend.append(`itens[${index}][dimensoes][altura]`, item.dimensoes.altura);
      formDataToSend.append(`itens[${index}][dimensoes][profundidade]`, item.dimensoes.profundidade);    
      formDataToSend.append(`itens[${index}][cor]`, item.cor);
      formDataToSend.append(`itens[${index}][cor_borda]`, item.cor_borda);
      formDataToSend.append(`itens[${index}][cor_pintura]`, item.cor_pintura);
      formDataToSend.append(`itens[${index}][cor_borda_pintura]`, item.cor_borda_pintura);
      formDataToSend.append(`itens[${index}][motivo]`, item.motivo);
      formDataToSend.append(`itens[${index}][obs]`, item.obs);

      // Adiciona arquivos (anexos) se existirem
      item.anexos.forEach((file, fileIndex) => {
        formDataToSend.append(`anexos`, file, `item-${index + 1}-${fileIndex}-${file.name}`);
      });
    });
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData({
        loja: '',
        dataDoPedido: '',
        cliente: '',
        montador: '',
        motivoGeral: '',
        itens: [{ ambiente: '', quantidade: '', descricao: '', dimensoes: { altura: '', largura: '', profundidade: '' }, cor: '', cor_borda: '', cor_pintura: '', cor_borda_pintura: '', motivo: '', obs: '', anexos: [] }],
      });
      onSave();
    } catch (error) {
      console.error('Erro ao criar solicitação:', error);
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
          <Button key="save" type="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </CustomFooter>
      }
      centered
      title="Cadastrar Solicitação"
    >
      <FormContainer>
        <Form onSubmitCapture={(e) => e.preventDefault()}>
          <FormRow>
            <FormGroup>
              <FormLabel>Seleciona a Loja:</FormLabel>
              <StyledSelect
                value={formData.loja}
                onChange={(value) => setFormData({ ...formData, loja: value })}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                required
              >
                {LOJAS.map(loja => (
                  <Option key={loja} value={loja}>
                    {loja}
                  </Option>
                ))}
              </StyledSelect>
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <FormLabel>Data do Pedido:</FormLabel>
              <StyledInput type="date" name="dataDoPedido" value={formData.dataDoPedido} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Cliente:</FormLabel>
              <StyledInput type="text" name="cliente" value={formData.cliente} onChange={handleChange} required />
            </FormGroup>
          </FormRow>
          <FormRow>
            <FormGroup>
              <FormLabel>Montador:</FormLabel>
              <StyledInput type="text" name="montador" value={formData.montador} onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Motivo Geral:</FormLabel>
              <StyledInput type="text" name="motivoGeral" value={formData.motivoGeral} onChange={handleChange} required />
            </FormGroup>
          </FormRow>

          {formData.itens.map((item, index) => (
            <div key={index}>
              <h3>------------------------------------Item {index + 1}-----------------------------------</h3>
              <FormRow>
                <FormGroup>
                  <FormLabel>Ambiente:</FormLabel>
                  <StyledInput type="text" name="ambiente" value={item.ambiente} onChange={(e) => handleItemChange(index, e)} required />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Quantidade:</FormLabel>
                  <StyledInput type="number" name="quantidade" value={item.quantidade} onChange={(e) => handleItemChange(index, e)} required />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <FormLabel>Descrição:</FormLabel>
                  <StyledInput type="text" name="descricao" value={item.descricao} onChange={(e) => handleItemChange(index, e)} required />
                </FormGroup>
              </FormRow>
              <FormRow>
                <FormGroup>
                  <FormLabel>Largura:</FormLabel>
                  <StyledInput type="number" name="largura" value={item.dimensoes.largura} onChange={(e) => handleDimensaoChange(index, e)} required />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Altura:</FormLabel>
                  <StyledInput type="number" name="altura" value={item.dimensoes.altura} onChange={(e) => handleDimensaoChange(index, e)} required />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Profundidade</FormLabel>
                  <StyledInput type="number" name="profundidade" value={item.dimensoes.profundidade} onChange={(e) => handleDimensaoChange(index, e)} required />
                </FormGroup>
              </FormRow>
              {/* CAMPOS DE PINTURA, APARECEM SE OS CAMPOS DE CORES FOREM "A DEFINIR" */}
              <FormRow>
                <FormGroup>
                  <FormLabel>Cor:</FormLabel>
                  <StyledInput type="text" name="cor" value={item.cor} onChange={(e) => handleItemChange(index, e)} required />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Cor Borda:</FormLabel>
                  <StyledInput type="text" name="cor_borda" value={item.cor_borda} onChange={(e) => handleItemChange(index, e)} required />
                </FormGroup>
                {/* SE COR FOR A DEFINIR - MOSTRAR ESSE CAMPO */}
                {/* {item.cor === 'LAVANDA' && (
                <FormGroup>
                  <FormLabel>Cor da Pintura:</FormLabel>
                  <StyledInput type="text" name="cor_pintura" value={item.cor_pintura} onChange={(e) => handleItemChange(index, e)} />
                </FormGroup>
                )} */}
                  {/* SE COR BORDA FOR A DEFINIR - MOSTRAR ESSE CAMPO */}
                {/* {item.cor_borda === 'LAVANDA' && (
                  <FormGroup>
                  <FormLabel>Cor Pintura da Borda:</FormLabel>
                  <StyledInput type="text" name="cor_borda_pintura" value={item.cor_borda_pintura} onChange={(e) => handleItemChange(index, e)} />
                </FormGroup>
                )} */}
              </FormRow>
              <FormRow>
                <FormGroup>
                  <FormLabel>Motivo:</FormLabel>
                  <StyledInput type="text" name="motivo" value={item.motivo} onChange={(e) => handleItemChange(index, e)} required />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Observações:</FormLabel>
                  <StyledTextArea name="obs" value={item.obs} onChange={(e) => handleItemChange(index, e)} />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <FormLabel>Anexar Fotos:</FormLabel>
                <StyledInput type="file" multiple name={`anexos[${index}]`} onChange={(e) => handleFileChange(index, e)} />
              </FormGroup>
              <Button type="primary" danger onClick={() => removeItem(index)}>Remover Item {index + 1}</Button>
            </div>
          ))}
          <Button style={{ marginTop: 5 }} type="primary" onClick={addItem}>Adicionar Item</Button>
        </Form>
      </FormContainer>
    </StyledModal>
  );
};

export default SolicitacaoFormModal;
