import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const storedUserType = localStorage.getItem("userType"); // Recupera o tipo de usuário

    if (userToken) {
      const parsedToken = JSON.parse(userToken);
      const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

      const hasUser = usersStorage?.find((user) => user.email === parsedToken.email);
      if (hasUser) {
        setUser({ ...hasUser, type: storedUserType }); // Define o tipo de usuário
      }
    }
  }, []);

  const signin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
  
    const hasUser = usersStorage?.find((user) => user.email === email);
  
    if (hasUser) {
      if (hasUser.password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        localStorage.setItem("userType", hasUser.type); // Armazena o tipo de usuário
        setUser({ ...hasUser, type: hasUser.type }); // Atualiza o estado do usuário com o tipo
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (email, password, type = 'viewer') => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
  
    const hasUser = usersStorage?.find((user) => user.email === email);
  
    if (hasUser) {
      return "Já tem uma conta com esse E-mail";
    }
  
    const newUser = [...(usersStorage || []), { email, password, type }];
    localStorage.setItem("users_bd", JSON.stringify(newUser));
  
    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
    localStorage.removeItem("userType"); // Remove o tipo de usuário ao fazer logout
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
