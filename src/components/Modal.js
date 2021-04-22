import React from "react";
import styled from "styled-components";
import { Botao } from "./Button";
const ModalBody = styled.div`
  width: 500px;
  background-color: ${(props) => props.theme.colors.primaryOpacity};
  margin-top: 40px;
`;

const Titulo = styled.h2`
  color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.white};
  padding: 1rem;
  margin: 0;
`;

const DivBotao = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primaryOpacity};
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const DivContent = styled.div`
  padding: 1rem;
  color: ${(props) => props.theme.colors.text};
`;
const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  left: 0;
  z-index: ${(props) => (props.opacity ? "1" : "-2")};
  opacity: ${(props) => (props.opacity ? "1" : "0")};
  background-color: #dfdfdfd4;
  justify-content: center;
  align-items: flex-start;
  -webkit-transition: all 0.5s 0.5s ease-in-out;
  transition: all 0.5s 0.5s ease-in-out;
`;
export const Modal = ({ children, isOpen, mensagem }) => {
  return (
    <>
      <Container opacity={isOpen}>
        <ModalBody>
          <Titulo>Aviso</Titulo>
          <DivContent>{mensagem}</DivContent>
          <DivBotao>{children}</DivBotao>
        </ModalBody>
      </Container>
    </>
  );
};
