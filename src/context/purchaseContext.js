import createDataContext from "./createContext";
import baseUrl from "./baseURL";
import Cookies from "js-cookie";
const purchaseReducer = (state, action) => {
  switch (action.type) {
    case "getOperacoes":
      return { ...state, historico: action.payload };
    case "fazerCompra":
      return { ...state, dolar: action.payload };
    case "getUserOperacoes":
      return { ...state, userOperacoes: action.payload };
    case "erro":
      return { ...state, err: action.payload };
  }
};
const fazerCompra = (dispatch) => async (valor) => {
  try {
    const response = await baseUrl.post("/purchase", valor);
    alert(response.data.msg);
    location.reload();
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response,
    });
  }
};

const getUserOperacoes = (dispatch) => async (id) => {
  try {
    const response = await baseUrl.get(`/userPurchase/${id}`);
    dispatch({ type: "getUserOperacoes", payload: response.data });
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response,
    });
  }
};
const getOperacoes = (dispatch) => async (operacao) => {
  try {
    const response = await baseUrl.get(`/getPurchase/${operacao}`);
    dispatch({ type: "getOperacoes", payload: response.data });
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response,
    });
  }
};

const realizarOperacao = (dispatch) => async (operacao) => {
  try {
    console.log(operacao);
    const response = await baseUrl.post(
      `/payment/${operacao.operacao}`,
      operacao
    );
    console.log(response);
    alert(response.data.msg);
    location.reload();
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response,
    });
  }
};

const recusarOperacao = (dispatch) => async (operacao) => {
  try {
    const response = await baseUrl.post("/payment/recusar", operacao);
    alert(response.data.msg);
    location.reload();
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response,
    });
  }
};

export const { Provider, Context } = createDataContext(
  purchaseReducer,
  {
    fazerCompra,
    getOperacoes,
    realizarOperacao,
    recusarOperacao,
    getUserOperacoes,
  },
  {}
);
