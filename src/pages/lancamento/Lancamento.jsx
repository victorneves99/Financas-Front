import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SelectMenu from "../../components/SelectMenu";
import {
  api,
  lancamentoParams,
  obterLista,
  obterTipo,
} from "../../services/api";
import LancamentosTable from "./LancamentosTable";

export const Lancamento = () => {
  const lista = obterLista();

  const tipo = obterTipo();

  const filtros = {
    ano: "",
    mes: "",
    tipo: "",
  };

  const [lancamentos, setLancamentos] = useState([]);

  const [buscaLancamento, setBuscaLancamento] = useState(filtros);

  const buscar = async () => {
    const token = localStorage.getItem("token");
    const tokenParse = JSON.parse(token);
    const usuarioLogado = localStorage.getItem("id");
    api.defaults.headers.authorization = `Bearer ${tokenParse}`;

    const lancamentoFiltro = {
      ano: buscaLancamento.ano,
      mes: buscaLancamento.mes,
      tipo: buscaLancamento.tipo,
      usuario: usuarioLogado,
    };

    await lancamentoParams(lancamentoFiltro)
      .then((res) => {
        setLancamentos(res.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  return (
    <>
      <div className="row min-vh-100 bg-light text-white align-items-center justify-content-center p-5">
        <div className="col-11 col-xl-10  p-0 mb-3">
          <div className="card text-white bg-light border-danger">
            <div className="card-body">
              <h4 className="card-title">Lancamentos</h4>
              <h6 className="card-subtitle mb-2 text-muted">
                Consulta Lancamentos
              </h6>

              <div className="row">
                <div className="col-12 col-lg-6 ">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="ano" className="form-label">
                        Ano
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ano"
                        placeholder="Digite o ano"
                        value={buscaLancamento.ano || ""}
                        onChange={(e) =>
                          setBuscaLancamento({
                            ...buscaLancamento,
                            ano: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="mes" className="form-label">
                        Mes
                      </label>
                      <SelectMenu
                        id="lista"
                        className="form-select"
                        lista={lista}
                        value={buscaLancamento.mes || ""}
                        onChange={(e) =>
                          setBuscaLancamento({
                            ...buscaLancamento,
                            mes: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tipo" className="form-label">
                        Tipo Lancamento
                      </label>
                      <SelectMenu
                        id="tipo"
                        className="form-select"
                        lista={tipo}
                        value={buscaLancamento.tipo || ""}
                        onChange={(e) =>
                          setBuscaLancamento({
                            ...buscaLancamento,
                            tipo: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      className="btn btn-outline-primary mt-4"
                      onClick={buscar}
                    >
                      Buscar
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger mt-4"
                    >
                      Cadastrar
                    </button>
                  </form>
                  <Link to={"/home"} className="btn btn-outline-success mt-3">
                    Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="col ">
          <LancamentosTable lancamento={lancamentos} />
        </div>
      </div>
    </>
  );
};
