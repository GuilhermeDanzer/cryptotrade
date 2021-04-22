import createDataContext from "./createContext";
import baseUrl from "./baseURL";
import axios from "axios";
import Cookies from "js-cookie";
const coinsReducer = (state, action) => {
  switch (action.type) {
    case "getAllCoins":
      return { ...state, moedas: action.payload };
    case "getOneCoin":
      return { ...state, moeda: action.payload };
    case "erro":
      return { ...state, err: action.payload };
  }
};

const cadastrarMoeda = (dispatch) => async (valor) => {
  try {
    const response = await baseUrl.post("/coin", valor);

    alert(response.data.msg);
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const mudarLimite = (dispatch) => async ({ limite }) => {
  try {
    console.log("limite", limite);
    const response = await baseUrl.post("/coin/limite", {
      limite,
    });

    alert(response.data.msg);
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const mudarRendimento = (dispatch) => async ({ rendimento, sigla }) => {
  try {
    const response = await baseUrl.post("/coin/rendimento", {
      sigla,
      rendimento,
    });

    alert(response.data.msg);
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};
const mudarValor = (dispatch) => async ({ valor, sigla }) => {
  try {
    console.log(valor, sigla);
    const response = await baseUrl.post("/coin/valor", { sigla, valor });

    alert(response.data.msg);
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};
const getOneCoin = (dispatch) => async (nome) => {
  try {
    const response = await baseUrl.get(`/coin/${nome}`);
    dispatch({ type: "getOneCoin", payload: response.data });
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const getAllCoins = (dispatch) => async () => {
  try {
    const response = await baseUrl.get("/coin");
    dispatch({ type: "getAllCoins", payload: response.data });
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const deletarMoeda = (dispatch) => async ({ sigla }) => {
  try {
    const response = await baseUrl.delete(`/coin/${sigla}`);
    alert(response.data.msg);
    window.history.back();
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

export const { Provider, Context } = createDataContext(
  coinsReducer,
  {
    getAllCoins,
    getOneCoin,
    mudarRendimento,
    mudarValor,
    mudarLimite,
    cadastrarMoeda,
    deletarMoeda,
  },
  { moedas: [], dolar: 0 }
);
