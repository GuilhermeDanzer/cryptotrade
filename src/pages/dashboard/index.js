import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { PagesTitle } from "../../components/PagesTitle";
import { Card } from "../../components/Card";
import { Botao } from "../../components/Button";
import { Context as UserContext } from "../../context/userContext";
import { Context as CoinContext } from "../../context/coinsContext";
import { useRouter } from "next/router";
import ProgressBar from "@ramonak/react-progress-bar";

const Dashboard = styled.div`
  display: flex;
  flex: 1 1 33%;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const CardDiv = styled.div`
  margin: 10px;
  margin: 10px !important;
  padding-top: 40px !important;
  background: aliceblue !important;
  border-radius: 25px !important;
  padding: 10px !important;
  padding-top: 40px !important;
`;
const DivBar = styled.div`
  width: 100px;
`;
export default function Home() {
  const { state, getActualUser } = useContext(UserContext);
  const coin = useContext(CoinContext);
  const userState = state;
  const router = useRouter();

  useEffect(() => {
    coin.getAllCoins();

    const intervalId = setInterval(() => {
      coin.getAllCoins();
    }, 10000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <PagesTitle>Dashboard</PagesTitle>

      <Dashboard>
        {userState.usuario !== undefined
          ? userState.usuario.moedas.map((element) => {
              return (
                <>
                  <CardDiv key={element._id}>
                    <ProgressBar
                      style={{ fontWeight: 200 }}
                      bgcolor="#223774"
                      completed={
                        element.rendimentoPorcentagem
                          ? parseInt(element.rendimentoPorcentagem)
                          : 0
                      }
                    />
                    <Card
                      nome={element.nome}
                      preco={element.valor}
                      rendimento={element.rendimento}
                      saldo={element.saldo}
                      aluguel={element.aluguel}
                      saque={element.saque}
                      saqueAtivo={element.saqueAtivo}
                    >
                      <Botao
                        style={{ flex: 0 }}
                        onClick={() =>
                          router.push({
                            pathname: "/trade",
                            query: { moeda: element.nome, operacao: "alugar" },
                          })
                        }
                      >
                        Alugar
                      </Botao>

                      <Botao
                        style={{ flex: 0 }}
                        onClick={() => router.push(`/saque/${element.nome}`)}
                      >
                        Sacar
                      </Botao>
                    </Card>
                  </CardDiv>
                </>
              );
            })
          : null}
      </Dashboard>
    </>
  );
}
