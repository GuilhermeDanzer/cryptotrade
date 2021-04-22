import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Provider as SideBarProvider } from "../context/sideBarContext";
import { Provider as AuthProvider } from "../context/authContext";
import { Provider as UserProvider } from "../context/userContext";
import { Provider as CoinsProvider } from "../context/coinsContext";
import { Provider as PurchaseProvider } from "../context/purchaseContext";
import { Provider as SaqueProvider } from "../context/saqueContext";
import { ProtectRoute } from "../context/protectionRoute";
import { Layout } from "../layout/Layout";
import GlobalStyle from "../styles/global";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import theme from "../styles/theme";
export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noNav = ["/", "/referencia/cadastro"];
  const showLayout = noNav.includes(router.pathname) ? false : true;
  const mostrarPagina =
    Cookies.get("token") && router.pathname !== "/" ? true : false;

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AuthProvider>
          <SideBarProvider>
            <UserProvider>
              <CoinsProvider>
                <SaqueProvider>
                  <PurchaseProvider>
                    <Layout showLayout={showLayout}>
                      <Component {...pageProps} />
                    </Layout>
                  </PurchaseProvider>
                </SaqueProvider>
              </CoinsProvider>
            </UserProvider>
          </SideBarProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
