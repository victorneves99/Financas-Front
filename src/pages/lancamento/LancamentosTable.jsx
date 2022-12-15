import React from "react";

const LancamentosTable = (props) => {
  const rows = props.lancamento.map((lancamento) => {
    return (
      <tr key={lancamento.id}>
        <td>{lancamento.descricao}</td>
        <td>{lancamento.valor}</td>
        <td>{lancamento.tipo}</td>
        <td>{lancamento.mes}</td>
        <td>{lancamento.status}</td>
        <td></td>
      </tr>
    );
  });

  return (
    <div className="table-responsive">
      <table className="table table-light table-hover">
        <thead>
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Tipo</th>
            <th scope="col">Mês</th>
            <th scope="col">Situação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

export default LancamentosTable;
