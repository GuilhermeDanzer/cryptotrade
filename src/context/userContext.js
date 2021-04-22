import createDataContext from "./createContext";
import baseUrl from "./baseURL";
import Cookies from "js-cookie";
const userReducer = (state, action) => {
  switch (action.type) {
    case "getActualUser":
      return { ...state, usuario: action.payload };

    case "getAllUsers":
      return { ...state, listaUsuarios: action.payload };
    case "getUsersPag":
      return { ...state, resultadoLista: action.payload };
    case "getUser": {
      return { ...state, userDetail: action.payload };
    }
    case "getUserReferenciados":
      return { ...state, userReferenciados: action.payload };

    case "erro":
      return { ...state, err: action.payload };
  }
};

const getActualUser = (dispatch) => async () => {
  try {
    const response = await baseUrl.get("/user");

    console.log(response.data);
    dispatch({ type: "getActualUser", payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const getAllUsers = (dispatch) => async () => {
  try {
    const response = await baseUrl.get("/users/all");

    console.log(response.data);
    dispatch({ type: "getAllUsers", payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};
const getUsersPag = (dispatch) => async ({ page, limit }) => {
  try {
    const response = await baseUrl.get(`/users?page=${page}&limit=${limit}`);

    console.log(response.data);
    dispatch({ type: "getUsersPag", payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const getUser = (dispatch) => async (id) => {
  try {
    const response = await baseUrl.get(`/user/${id}`);

    console.log(response.data);
    dispatch({ type: "getUser", payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const getUserReferenciados = (dispatch) => async (hash) => {
  try {
    const response = await baseUrl.get(`/referenciados/${hash}`);

    dispatch({ type: "getUserReferenciados", payload: response.data });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};
const definirAuth = (dispatch) => async (valor) => {
  try {
    const response = await baseUrl.post("/userAuth", valor);

    alert(response.data.msg);
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};
export const { Provider, Context } = createDataContext(
  userReducer,
  {
    getActualUser,
    getAllUsers,
    getUsersPag,
    getUser,
    getUserReferenciados,
    definirAuth,
  },
  { listaUsuarios: [], userDetail: {} }
);
