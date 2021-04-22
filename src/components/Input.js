import React from "react";
import styled from "styled-components";

const Campo = styled.input`
  width: ${(props) => (props.width ? props.width : "90%")};
  height: 30px;
  //border: solid 3px ${(props) => props.theme.colors.white};
  outline: none;
  padding: 0px 8px;
  font-size: 14px;
  border-radius: 15px !important;
  border: none !important;
`;

export const Label = styled.p`
  font-size: 20px;
  font-weight: 300;
  color: ${(props) => props.theme.colors.lightDetail};
  align-self: flex-start;
  margin-left: 40px;
  font-size: 14px !important;
  color: #fff !important;
  font-weight: bold !important;
`;

export const Combo = styled.select`
  width: ${(props) => (props.width ? props.width : "90%")};
  height: 30px;
  border: solid 3px ${(props) => props.theme.colors.white};
  outline: none;
  padding: 0px 8px;
  font-size: 14px;
  text-transform: capitalize;
  border-radius: 15px !important;
  border: none !important;
`;

export const Option = styled.option`
  text-transform: capitalize;
`;

export const Texto = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-size: 20px;
  text-align: left;
  align-self: flex-start;
  margin: 0 0 0 42px;
  text-transform: capitalize;
`;
export const Input = (props) => {
  return <Campo {...props}></Campo>;
};
