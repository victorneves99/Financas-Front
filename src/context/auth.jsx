import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api, cadastrar, criarSessao } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState();

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await criarSessao(username, password);
    console.log("CHAMNDO LOGIN");
    console.log("login", response.data);

    const userLog = response.data.username;

    const idLogado = response.data.id;

    const token = response.data.accessToken;

    const usuario = response.data;

    localStorage.setItem("user", JSON.stringify(userLog));
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("id", JSON.stringify(idLogado));
    localStorage.setItem("userAll", JSON.stringify(usuario));

    // api.defaults.headers.Authorization = `Bearer ${token}`;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(userLog);
    navigate("/home");
    toast.success(`Bem Vindo ${username.toUpperCase()} ao Finanças`, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 7000,
    });
  };

  const logout = () => {
    console.log("logout");

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("userAll");

    // api.defaults.headers.Authorization = null;
    api.defaults.headers.common["Authorization"] = null;

    setUser(null);

    navigate("/");
  };

  const signup = async (username, password, email) => {
    const response = await cadastrar(username, password, email);

    if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      toast.warning("Infome um email valido");
    }

    if (response.status === 400) {
      return;
    }

    toast.success(`${username} SEJA Bem Vindo, AGORA FAÇA LOGIN `, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 10000,
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        autenticado: !!user,
        user,
        login,
        logout,
        loading,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
