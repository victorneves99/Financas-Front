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

  const [saldo, setSaldo] = useState();

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
        <div className="row justify-content-end p-3">
          <div className="col-6 col-lg-2 col-md-2 ">
            <button onClick={handleLogout} className="btn btn-danger ">
              Logout
            </button>
          </div>
        </div>
        <div className="row min-vh-100 justify-content-center align-items-center bg-light text-white ">
          <div className="col col-11 col-lg-6 col-md-6">
            <h1>HOME</h1>

            <div
              className="card  text-white border-info mb-3 "
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
              <div className="card-header">BEM VINDO</div>
              <div className="card-body">
                <h4 className="card-title">FINANCAS</h4>
                <p className="card-text">
                  Este é um sistema de finanças criado para ajudar pessoas
                  desorganizadas com seu dindin.
                </p>

                <p>Seu SALDO é : {saldo}</p>
              </div>
            </div>

            <div className="row align-items-center justify-content-center">
              <Link
                to={"/consulta-lancamento"}
                className="btn btn-outline-info mt-3"
                style={{ width: "50%" }}
              >
                Lancamentos
              </Link>
            </div>
          </div>
          <div className="col col-lg-4">
            <div
              className="card border-primary mb-3"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            >
              <div className="card-header text-black">SALDO</div>
              <div className="card-body text-primary">
                <h5 className="card-title h1">SEU SALDO É :</h5>
                <p className="card-text text-center h1 m-lg-5">{saldo}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
