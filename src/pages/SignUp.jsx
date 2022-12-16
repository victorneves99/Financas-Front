import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { signup } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("signup", { password, username, email });
    signup(username, password, email);
  };
  return (
    <div>
      <div className="container-fluid bg-light text-white">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <div className="col col-xl-2  col-md-4">
            <h1 style={{ color: "#DC143C" }} className="text-center">
              Cadastrar
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
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
                  Cadastrar
                </button>
              </div>
            </form>
            <Link className="btn  btn-outline-danger mt-3" to={"/"}>
              Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
