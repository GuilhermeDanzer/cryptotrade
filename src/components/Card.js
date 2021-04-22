import React from "react";

import styled from "styled-components";

export const ContainerCard = styled.div`
  position: relative;
  width: 375px;
  height: 100%;
  background: ${(props) => props.theme.colors.secondary};
  //box-shadow: 0px 0px 16px rgba(0, 0, 0, 1);
  border-radius: 2px;
  display: flex;
  padding-top: 15px;
  padding-left: 15px;
  flex-direction: column;
  //pós
  border-radius: 25px !important;
  margin-top: 17px !important;
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
  );
  -webkit-box-shadow: -1px 2px 15px -1px rgb(0 0 0 / 48%) !important;
  box-shadow: -1px 2px 15px -1px rgb(0 0 0 / 48%) !important;
`;

const Icon = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  margin-left: 8px;
  &&:after {
    position: absolute;
    content: "";
    bottom: 0;
    height: 1.5px;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 100%;
    //background: ${(props) => props.theme.colors.detail};
    border: 0 !important;
    height: 1px !important;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.75),
      rgba(0, 0, 0, 0)
    ) !important;
  }
  margin-bottom: 20px;
`;

const NomeMoeda = styled.p`
  font-size: 22px;
  font-weight: bold;
  margin-left: 15px;
  color: ${(props) => props.theme.colors.text};
  text-transform: capitalize;
`;

const Valor = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.text};
  text-transform: capitalize;
  margin-top: 0px;
`;
const PorcentagemDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  align-items: flex-end;
  padding-right: 15px;
`;

const Porcentagem = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text};
`;

const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Saldo = styled.span`
  color: ${(props) => props.theme.colors.text};
  font-size: 2rem;
`;

const RendimentoTexto = styled.p`
  color: ${(props) => props.theme.colors.text};
  font-size: 1rem;
`;
const DivBotao = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const Card = ({
  children,
  nome,
  preco,
  aluguel,
  rendimento,
  saldo,
  saque,
  saqueAtivo,
}) => {
  console.log(rendimento);
  const rendimentoPorcentagem = rendimento * 100;
  preco.toString();
  return (
    <ContainerCard>
      <Icon>
        <NomeMoeda>{nome}</NomeMoeda>

        <PorcentagemDiv>
          <Porcentagem>{rendimentoPorcentagem}%</Porcentagem>
          <Porcentagem>Dia</Porcentagem>
        </PorcentagemDiv>
      </Icon>

      <CardBody>
        <Saldo>Saldo</Saldo>
        <Saldo>{saldo}</Saldo>
        <RendimentoTexto>Rendimento: {aluguel}</RendimentoTexto>
        <RendimentoTexto>Disponivel para ativar: {saque}</RendimentoTexto>
        <RendimentoTexto>Ativo: {saqueAtivo}</RendimentoTexto>

        <Valor>
          {nome}: 1 | BRL: {preco.toLocaleString("pt-BR")}
        </Valor>
        <DivBotao>{children}</DivBotao>
      </CardBody>
    </ContainerCard>
  );
};
