import React, { useContext } from "react";
import { Header } from "../components/Header";
import { LateralMenu } from "../components/LateralMenu";
import styled from "styled-components";
import { Context as SideBarContext } from "../context/sideBarContext";

const Container = styled.div``;
export const Layout = ({ children, showLayout }) => {
  const { state } = useContext(SideBarContext);
  return (
    <>
      {showLayout ? (
        <div>
          <Header />
          <script src="https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js"></script>
          <coingecko-coin-price-marquee-widget
            coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
            currency="usd"
            background-color="#f7f7f7"
            locale="en"
          ></coingecko-coin-price-marquee-widget>
          {state.estado ? <LateralMenu /> : null}
          <Container>{children}</Container>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
