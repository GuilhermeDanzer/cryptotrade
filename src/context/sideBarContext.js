import createDataContext from "./createContext";

const sideBarReducer = (state, action) => {
  switch (action.type) {
    case "open":
      return { ...state, estado: action.payload };

    default:
      return state;
  }
};

const openSideBar = (dispatch) => (valor) => {
  dispatch({ type: "open", payload: valor });
};
export const { Provider, Context } = createDataContext(
  sideBarReducer,
  { openSideBar },
  { estado: false }
);
