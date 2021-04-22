import React from "react";
import styled from "styled-components";
import { Botao } from "./Button";
import moment from "moment";
import Cookies from "js-cookie";
export const TableBody = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableRow = styled.tr`
  background-color: ${(props) =>
    props.isOdd
      ? `background-image: -moz-linear-gradient(
    to right bottom,
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
    to right bottom,
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
    100% 100%,
    0 0,
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
    to right bottom,
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
    to right bottom,
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
  -webkit-box-shadow: -1px 2px 15px -1px rgb(0 0 0 / 48%) !important;
  box-shadow: -1px 2px 15px -1px rgb(0 0 0 / 48%) !important;
  border: none !important`
      : props.theme.colors.secondary};
  text-transform: capitalize;
`;

export const TableData = styled.td`
  color: ${(props) => props.theme.colors.text};
  height: 50px;
  width: 200px;
  text-align: center;
`;

export const TableHead = styled.th`
  color: ${(props) => props.theme.colors.text};
  //background-color: ${(props) => props.theme.colors.detail};
  height: 50px;
  width: 200px;
`;
export const Table = ({ dados, funcao, textoBotao, elemento, admin }) => {
  const email = Cookies.get("email");

  return (
    <TableBody rules="none">
      <TableRow isOdd={Boolean(1 % 2)}>
        <TableHead>Data</TableHead>
        <TableHead>De</TableHead>
        <TableHead>Operação</TableHead>
        <TableHead>Para</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Moeda</TableHead>
        <TableHead>Valor em reais</TableHead>
        <TableHead>Quantidade</TableHead>
        {admin ? null : <TableHead></TableHead>}
      </TableRow>
      {dados !== undefined
        ? dados.map((element, i) => {
            return (
              <TableRow>
                <TableData>
                  {moment(element.createdAt).format(`DD/MM/YYYY - HH:mm:ss`)}
                </TableData>
                <TableData>{element.usuarioEmissor.nome}</TableData>
                <TableData>{element.operacao}</TableData>
                <TableData>{element.usuarioReceptor.nome}</TableData>
                <TableData>{element.aprovado}</TableData>
                <TableData>{element.moeda}</TableData>
                <TableData>
                  R$ {element.valor.toLocaleString("pt-BR")}
                </TableData>
                <TableData>{element.quantidade}</TableData>
                {admin ? null : (
                  <TableData>
                    {(element.usuarioEmissor.email !== email &&
                      element.operacao === "vender") ||
                    (element.usuarioReceptor.email !== email &&
                      element.operacao === "comprar") ||
                    element.aprovado !== "Aguardando" ? (
                      "Não é possivel fazer ações"
                    ) : (
                      <Botao border={true} onClick={() => funcao(element)}>
                        {textoBotao}
                      </Botao>
                    )}
                  </TableData>
                )}
              </TableRow>
            );
          })
        : null}
    </TableBody>
  );
};
