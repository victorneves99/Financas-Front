import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import React from "react";
import LoginPage from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { AuthContext, AuthProvider } from "./context/auth";
import { useContext } from "react";
import SignUp from "./pages/SignUp";
import { Lancamento } from "./pages/lancamento/Lancamento";

const AppRoute = () => {
  const Private = ({ children }) => {
    const { autenticado, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Carregango . . .</div>;
    }

    if (!autenticado) {
      return <Navigate to={"/"} />;
    }
    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="*" element={<LoginPage />} />

          <Route
            exact
            path="/consulta-lancamento"
            element={
              <Private>
                <Lancamento />
              </Private>
            }
          />
          <Route
            exact
            path="/home"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoute;
