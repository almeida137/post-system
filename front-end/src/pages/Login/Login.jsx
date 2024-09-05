import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { signin, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos!");
      return;
    }

    const res = await signin(email, senha);

    if (res) {
      setError(res); // Exibe mensagem de erro se houver
    } else {
      navigate("/dashboard"); // Navega para o dashboard se o login for bem-sucedido
    }
  };
  return (
    <C.Container>
      <C.Label>LOGIN SISTEMA DE SOLICITAÇÕES</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text={loading ? "Carregando..." : "Entrar"} onClick={handleLogin} />
        {/* <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup> */}
      </C.Content>
    </C.Container>
  );
};

export default Login;
