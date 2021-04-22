import React from "react";
import styled from "styled-components";

export const Botao = styled.button`
  outline: none;
  text-transform: capitalize;
  background: transparent;
  color: ${(props) => (props.black ? "#000" : "#fff")};
  border-radius: 3px;
  border: ${(props) => (props.black ? "3px solid #000" : "3px solid  #fff")};
  border-color: ${(props) => props.theme.colors.secondary};
  margin-top: 5px;
  height: ${(props) => (props.altura ? props.altura : "50px")};
  width: 200px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "18px")};
  font-weight: 600;
  align-self: "center";
  cursor: pointer;
  transition: 0.25s ease-out;
  font-style: ${(props) => (props.fontStyle ? props.fontStyle : "none")};
  /*&:hover {
    font-weight: bold;
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white} !important;
  }*/
  //pós

  border: 3px solid #fff;
  border-radius: 15px !important;
`;
