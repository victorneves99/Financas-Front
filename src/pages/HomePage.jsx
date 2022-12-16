import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { api, obterSaldo } from "../services/api";

export const HomePage = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const [saldo, setSaldo] = useState(0);

  console.log(saldo);

  useEffect(() => {
    async function teste() {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const tokenParse = JSON.parse(token);
      api.defaults.headers.authorization = `Bearer ${tokenParse}`;
      await obterSaldo(id)
        .then((res) => {
          setSaldo(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    teste();
  }, []);

  return (
    <>
      <div className="container-fluid bg-light">
        <div className="row min-vh-100 justify-content-center align-items-center bg-light text-white ">
          <div className="row flex-column justify-content-center">
            <div className="col col-xl-4 col-lg-4 col-md-3 mb-2 align-self-center">
              <Link onClick={handleLogout} className="btn btn-danger">
                Logout
              </Link>
            </div>
            <div className="col col-xl-4 align-self-center">
              <Link
                to={"/consulta-lancamento"}
                className="btn btn-outline-info mt-3"
              >
                Lancamentos
              </Link>
            </div>
          </div>
          <div className="row justify-content-center m-2">
            <div className="col col-lg-6 col-md-6">
              <div
                className="card  text-white border-info mb-3 "
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              >
                <div className="card-header text-center">BEM VINDO</div>
                <div className="card-body" style={{ minHeight: "280px" }}>
                  <h4 className="card-title">FINANCAS</h4>
                  <p className="card-text">
                    Este é um sistema de finanças criado para ajudar pessoas
                    desorganizadas com seu dindin.
                  </p>
                </div>
              </div>
            </div>
            <div className="col col-xl-4">
              <div
                className="card border-primary"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              >
                <div className="card-body text-primary">
                  <h5
                    className="card-title h1 text-center"
                    style={{ fontFamily: "Roboto" }}
                  >
                    SEU SALDO
                  </h5>
                  {Math.sign(saldo) < 0 ? (
                    <p className="card-text text-center h1 m-lg-5 text-bg-danger">
                      {saldo}
                    </p>
                  ) : (
                    <p className="card-text text-center h1 m-lg-5">{saldo}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
