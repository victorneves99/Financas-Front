import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://financas.up.railway.app",
});

api.interceptors.request.use(async (config) => {
  // Declaramos um token manualmente para teste.

  const token = localStorage.getItem("token");
  const tokenParse = JSON.parse(token);

  axios.defaults.headers.common["Authorization"] = `Bearer ${tokenParse}`;

  return config;
});

export const criarSessao = async (username, password) => {
  // const [err, setErr] = useState();

  return api
    .post("/api/auth/signin", { username, password })

    .catch((erro) => {
      toast.error(erro.response.data);
      if (erro.response) {
        const erroResponse = erro.response.data.errors;
        for (var i = 0; i < erroResponse.length; i++) {
          console.log(erroResponse[i].message);
          toast.error(erroResponse[i].message);
        }
      }
    });
};

export const obterSaldo = async (id) => {
  return api.get(`/api/usuarios/${id}/saldo`);
};

export const cadastrar = async (username, password, email) => {
  return api
    .post("/api/auth/signup", { username, password, email })
    .catch((erro) => {
      if (erro.response) {
        toast.error(erro.response.data);
        const erroResponse = erro.response.data.errors;
        for (var i = 0; i < erroResponse.length; i++) {
          console.log(erroResponse[i].message);
          toast.error(erroResponse[i].message, {
            autoClose: 15000,
          });
        }
      }
    });
};

export const lancamentoParams = async (lancamentoFiltro) => {
  let params = `/api/lancamentos?ano=${lancamentoFiltro.ano}`;
  if (lancamentoFiltro.mes) {
    params = `${params}&mes=${lancamentoFiltro.mes}`;
  }
  if (lancamentoFiltro.mes) {
    params = `${params}&tipo=${lancamentoFiltro.tipo}`;
  }
  if (lancamentoFiltro.mes) {
    params = `${params}&status=${lancamentoFiltro.status}`;
  }
  if (lancamentoFiltro.usuario) {
    params = `${params}&usuario=${lancamentoFiltro.usuario}`;
  }
  if (lancamentoFiltro.descricao) {
    params = `${params}&descricao=${lancamentoFiltro.descricao}`;
  }

  return api.get(params);
};

export function obterLista() {
  const lista = [
    {
      label: "Selecione",
      value: "",
    },
    {
      label: "Janeiro",
      value: 1,
    },
    {
      label: "Fevereiro",
      value: 2,
    },
    {
      label: "Março",
      value: 3,
    },
    {
      label: "Abril",
      value: 4,
    },
    {
      label: "Maio",
      value: 5,
    },
    {
      label: "Junho",
      value: 6,
    },
    {
      label: "Julho",
      value: 7,
    },
    {
      label: "Agosto",
      value: 8,
    },
    {
      label: "Setembro",
      value: 9,
    },
    {
      label: "Outubro",
      value: 10,
    },
    {
      label: "Novembro",
      value: 11,
    },
    {
      label: "Dezembro",
      valor: 12,
    },
  ];

  return lista;
}

export function obterTipo() {
  const tipo = [
    {
      label: "Selecione . . .",
      value: "",
    },
    {
      label: "Despesa",
      value: "DESPESA",
    },
    {
      label: "Receita",
      value: "RECEITA",
    },
  ];
  return tipo;
}
