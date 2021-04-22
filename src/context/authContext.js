import createDataContext from "./createContext";
import baseUrl from "./baseURL";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { token: action.payload };
    case "register":
      return {
        token: action.payload.token,
        authQRCode: action.payload.authQRCode,
      };
    case "logout":
      return {};

    case "verify":
      return {
        ...state,
        verified: action.payload,
      };

    case "validate":
      return {
        ...state,
        validated: action.payload.validated,
        token: action.payload.token,
      };
    case "erro":
      return { ...state, err: action.payload };
  }
};

const login = (dispatch) => async ({ email, password }) => {
  try {
    const response = await baseUrl.post("/login", { email, password });

    Cookies.set("email", email);

    dispatch({ type: "login", payload: "Usuario correto" });
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const register = (dispatch) => async (valores) => {
  console.log("valores", valores);
  try {
    const response = await baseUrl.post("/register", valores);

    Cookies.set("email", valores.email);
    Cookies.set("authQRCode", response.data.authQRCode);

    dispatch({
      type: "register",
      payload: {
        token: response.data.token,
        authQRCode: response.data.authQRCode,
      },
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};
const verify = (dispatch) => async ({ email, token2FA }) => {
  try {
    console.log(token2FA);
    const response = await baseUrl.post("/verify", { email, token2FA });
    Cookies.set("token", response.data.token);
    dispatch({ type: "verify", payload: response.data.verified });
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const validate = (dispatch) => async ({ email, token2FA }) => {
  try {
    const response = await baseUrl.post("/validate", { email, token2FA });
    Cookies.set("token", response.data.token);
    dispatch({
      type: "validate",
      payload: {
        token: response.data.token,
        validated: response.data.validated,
      },
    });
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};

const logout = (dispatch) => () => {
  try {
    dispatch({ type: "logout", payload: null });
  } catch (err) {
    dispatch({
      type: "erro",
      payload: err.response.data.error,
    });
  }
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { login, register, validate, verify, logout },
  { token: null, err: "" }
);
