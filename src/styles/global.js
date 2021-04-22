import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

body {

 /* background-color:${(props) => props.theme.colors.background};*/
  background-color: #f1fafe !important;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   overflow-x:hidden
}

a {
  color:${(props) => props.theme.colors.primary};
  text-decoration:none;
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
`;
