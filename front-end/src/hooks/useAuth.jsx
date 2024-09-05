import { useState, useEffect } from "react";
import axios from "axios";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [signed, setSigned] = useState(false);
  const [userType, setUserType] = useState(null); // Estado para armazenar o tipo de usuário

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");

    if (token) {
      setSigned(true);
      setUserType(storedUserType); // Definir o tipo de usuário no estado
    }
  }, []);

  const signin = async (email, senha) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth`, {
        email,
        senha,
      });

      // Armazenar token e tipo de usuário no localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType); // Verifique se `response.data.userType` é o tipo correto
      setSigned(true);
      setUserType(response.data.userType);
      setLoading(false);
      return null; // Indica sucesso
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        return error.response.data.error; // Retorna mensagem de erro do servidor
      }
      return "Erro ao fazer login"; // Mensagem de erro genérica
    }
  };

  const signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType"); // Remove o tipo de usuário ao fazer logout
    setSigned(false);
    setUserType(null); // Resetar o tipo de usuário
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = getToken();
    if (!token) {
      throw new Error("Token não encontrado");
    }

    try {
      const response = await axios({
        ...options,
        url,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { signin, signout, getToken, fetchWithAuth, loading, signed, userType };
};

export default useAuth;
