import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  &&:after {
    position: absolute;
    content: "";
    bottom: 0;
    height: 1.5px;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 100%;
    background: #fff;
    border: 0 !important;
    height: 1px !important;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    ) !important;
  }
`;
const Titulo = styled.h1`
  color: ${(props) => props.theme.colors.detail};
  font-size: 26px !important;
  padding-bottom: 12px !important;
  color: #25c9df !important;
  margin-left: 20px;
`;
export const PagesTitle = ({ children }) => {
  return (
    <Wrapper>
      <Titulo>{children}</Titulo>
    </Wrapper>
  );
};
