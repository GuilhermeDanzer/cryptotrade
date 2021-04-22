import createDataContext from "./createContext";
import baseUrl from "./baseURL";
const saqueReducer = (state, action) => {
  switch (action.type) {
    case "getOperacoes":
      return { ...state, historico: action.payload };
    case "fazerCompra":
      return { ...state, dolar: action.payload };
    case "erro":
      return { ...state, err: action.payload };
  }
};
const sacar = (dispatch) => async (valor) => {
  try {
    const response = await baseUrl.post("/sacar", valor);
    alert(response.data.msg);
    location.reload();
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

export const { Provider, Context } = createDataContext(
  saqueReducer,
  {
    sacar,
  },
  {}
);
