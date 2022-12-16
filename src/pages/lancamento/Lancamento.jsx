import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SelectMenu from "../../components/SelectMenu";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  api,
  lancamentoParams,
  obterLista,
  obterTipo,
} from "../../services/api";
import LancamentosTable from "./LancamentosTable";
import { Button, Modal } from "react-bootstrap";

export const Lancamento = () => {
  const lista = obterLista();

  const tipo = obterTipo();

  const filtros = {
    ano: "",
    mes: "",
    tipo: "",
    descricao: "",
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [lancamentos, setLancamentos] = useState([]);

  const [buscaLancamento, setBuscaLancamento] = useState(filtros);

  const [lancamentoDeletar, setLancamentoDeletar] = useState({});

  const buscar = async () => {
    if (!buscaLancamento.ano) {
      toast.error("O preenchimento do campo Ano é obrigatorio!");
      return false;
    }
    const token = localStorage.getItem("token");
    const tokenParse = JSON.parse(token);
    const usuarioLogado = localStorage.getItem("id");
    api.defaults.headers.authorization = `Bearer ${tokenParse}`;

    const lancamentoFiltro = {
      ano: buscaLancamento.ano,
      mes: buscaLancamento.mes,
      tipo: buscaLancamento.tipo,
      usuario: usuarioLogado,
      descricao: buscaLancamento.descricao,
    };

    await lancamentoParams(lancamentoFiltro)
      .then((res) => {
        setLancamentos(res.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  function editar(id) {
    console.log("edit", id);
  }

  const deletar = async () => {
    await api
      .delete(`/api/lancamentos/${lancamentoDeletar.id}`)
      .then((res) => {
        const lancamentoDelete = lancamentos;
        const index = lancamentoDelete.indexOf(lancamentoDeletar);
        lancamentoDelete.splice(index, 1);
        setLancamentos(lancamentos);
        toast.success("Lançamento deletado com sucesso!");
        handleClose();
      })
      .catch((erro) => {
        toast.error("Erro ao tentar deletar o laçamento.");
      });
  };

  function abrirModalConfirm(lancamento) {
    handleShow();
    setLancamentoDeletar(lancamento);
  }

  const cancelarDelecao = () => {
    handleClose();
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row min-vh-100 bg-light text-white align-items-center justify-content-center ">
          <div className="row justify-content-center">
            <div className="col col-xl-4 col-lg-4 col-md-3 mb-2">
              <Link to={"/home"} className="btn btn-success mt-3">
                Home
              </Link>
            </div>
          </div>
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
                        <label htmlFor="ano" className="form-label">
                          Descrição
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="desc"
                          placeholder="Digite a descrição"
                          value={buscaLancamento.descricao || ""}
                          onChange={(e) =>
                            setBuscaLancamento({
                              ...buscaLancamento,
                              descricao: e.target.value,
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col">
              <LancamentosTable
                lancamento={lancamentos}
                deletar={abrirModalConfirm}
                editar={editar}
              />
            </div>
            <div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>EXCLUIR</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirma a exclusão desse lançamento ? </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={deletar}>
                    Confirmar
                  </Button>

                  <Button
                    variant="primary"
                    onClick={cancelarDelecao}
                    value="Cancelar"
                  >
                    Cancelar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
