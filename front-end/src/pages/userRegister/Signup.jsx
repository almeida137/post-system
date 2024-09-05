import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConf: '',
    password: '',
    type: '',
    active: 1
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.emailConf || !formData.password || !formData.type) {
      setError("Preencha todos os campos");
      return;
    }
    if (formData.email !== formData.emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }
    setError(""); // Limpar mensagem de erro se tudo estiver correto
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          cpf: formData.cpf,
          email: formData.email,
          password: formData.password,
          type: formData.type,
          active: formData.active
        })
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage('Usuário criado com sucesso!');
        navigate('/');  // Redirecionar para a página de login ou outra página
      } else {
        setMessage(data.msg || 'Erro ao criar usuário.');
      }
    } catch (err) {
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <C.Container>
        <C.Label>CADASTRO DE USUÁRIO</C.Label>
        <C.Content>
          <Input
            type="text"
            name="name"
            placeholder="Digite seu Nome"
            value={formData.name}
            onChange={onChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Digite seu E-mail"
            value={formData.email}
            onChange={onChange}
          />
          <Input
            type="email"
            name="emailConf"
            placeholder="Confirme seu E-mail"
            value={formData.emailConf}
            onChange={onChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua Senha"
            value={formData.password}
            onChange={onChange}
          />
          <C.Select
            name="type"
            value={formData.type}
            onChange={onChange}
          >
            <option value="">Selecione o Tipo de Usuário</option>
            <option value="Interno">Interno</option>
            <option value="Externo">Externo</option>
            <option value="Suporte">Suporte</option>
          </C.Select>
          <C.labelError>{error}</C.labelError>
          <Button Text="Inscrever-se" onClick={handleSignup} />
          <C.LabelSignin>
            Já tem uma conta?
            <C.Strong>
              <Link to="/">&nbsp;Entre</Link>
            </C.Strong>
          </C.LabelSignin>
          <C.labelError>{message}</C.labelError> {/* Exibir mensagem de sucesso ou erro */}
        </C.Content>
    </C.Container>
  );
};

export default Signup;
