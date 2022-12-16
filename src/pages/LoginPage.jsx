import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const LoginPage = () => {
  const { autenticado, login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit", { password, username });
    login(username, password);
  };

  return (
    <div className="container-fluid bg-light text-white">
      <div className="row min-vh-100 justify-content-center align-items-center">
        <div className="col col-xl-2 col-lg-6  col-md-4">
          <h1 style={{ color: "#DC143C" }} className="text-center">
            LOGIN
          </h1>
          <p>{String(autenticado)}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="col mt-5" style={{ textAlign: "center" }}>
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
          </form>
          <Link className="btn  btn-outline-danger mt-3" to={"/signup"}>
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
