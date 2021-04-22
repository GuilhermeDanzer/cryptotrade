import React from "react";
import styled from "styled-components";

export const Titulo = styled.h2`
  font-style: italic;
  color: ${(props) => props.theme.colors.text};
`;
const FormBody = styled.div`
  min-width: 375px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 25px !important;
  box-shadow: -1px 2px 15px -1px rgb(0 0 0 / 48%) !important;
  background-image: -moz-linear-gradient(
    to top,
    #252a40,
    #253159,
    #223774,
    #1c3e8f,
    #1244aa,
    #1256c1,
    #0d68d8,
    #007bef,
    #009cff,
    #00b9ff,
    #00d3fb,
    #00eaf1
  ) !important;
  background-image: -webkit-linear-gradient(
    to top,
    #252a40,
    #253159,
    #223774,
    #1c3e8f,
    #1244aa,
    #1256c1,
    #0d68d8,
    #007bef,
    #009cff,
    #00b9ff,
    #00d3fb,
    #00eaf1
  ) !important;
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#252a40),
    color-stop(0.09, #253159),
    color-stop(0.18, #223774),
    color-stop(0.27, #1c3e8f),
    color-stop(0.36, #1244aa),
    color-stop(0.45, #1256c1),
    color-stop(0.55, #0d68d8),
    color-stop(0.64, #007bef),
    color-stop(0.73, #009cff),
    color-stop(0.82, #00b9ff),
    color-stop(0.91, #00d3fb),
    to(#00eaf1)
  ) !important;
  background-image: -o-linear-gradient(
    to top,
    #252a40,
    #253159,
    #223774,
    #1c3e8f,
    #1244aa,
    #1256c1,
    #0d68d8,
    #007bef,
    #009cff,
    #00b9ff,
    #00d3fb,
    #00eaf1
  ) !important;
  background-image: linear-gradient(
    to top,
    #252a40,
    #253159,
    #223774,
    #1c3e8f,
    #1244aa,
    #1256c1,
    #0d68d8,
    #007bef,
    #009cff,
    #00b9ff,
    #00d3fb,
    #00eaf1
  ) !important;
  padding-bottom: 50px !important;
`;
export const FormContainer = styled.div`
  margin: 10px;
  padding-bottom: 10px;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const FormCard = ({ children }) => {
  return <FormBody>{children}</FormBody>;
};
