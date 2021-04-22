import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { PagesTitle } from "../../components/PagesTitle";
import {
  FormCard,
  FormContainer,
  FormWrapper,
  Titulo,
} from "../../components/FormCard";
import { Input, Combo, Option, Label, Texto } from "../../components/Input";
import { Botao } from "../../components/Button";

import { Context as userContext } from "../../context/userContext";
import { Context as purchaseContext } from "../../context/purchaseContext";
import { Context as coinContext } from "../../context/coinsContext";

import styled from "styled-components";

const Trade = () => {
  const router = useRouter();
  const { state, getAllUsers } = useContext(userContext);
  const moeda = useContext(coinContext);
  const purchase = useContext(purchaseContext);
  const [values, setValues] = useState({ moeda: { valor: 0 } });
  const [valoresQuery, setValoresQuery] = useState({
    moeda: false,
    operacao: false,
    renderizado: false,
  });
  const handleChange = (prop) => (event) => {
    if (prop === "moeda") {
      var moedaJson = JSON.parse(event.target.value);
      setValues({ ...values, [prop]: moedaJson });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const comprar = async (valores) => {
    valores = {
      ...valores,
      valor: values.moeda.valor * values.quantidade,
    };

    purchase.fazerCompra(valores);
  };
  useEffect(() => {
    getAllUsers();
    moeda.getAllCoins();
    if (router.asPath !== router.route) {
      setValoresQuery({
        moeda: router.query.moeda,

        operacao: router.query.operacao,
      });
    }
  }, [router]);

  const listaUsuarios = state.listaUsuarios;
  const listaMoedas = moeda.state.moedas;

  console.log(values.operacao);

  return (
    <>
      <PagesTitle>Trade</PagesTitle>

      <FormWrapper>
        <FormContainer>
          <FormCard>
            <Titulo>Comercializar</Titulo>
            <Label>Operação</Label>
            {valoresQuery.operacao ? (
              valoresQuery.renderizado ? (
                <Texto>{valoresQuery.operacao}</Texto>
              ) : null
            ) : (
              <Combo width="75%" onChange={handleChange("operacao")}>
                <Option value="none" selected disabled hidden>
                  Selecione uma operação
                </Option>

                <Option value="vender">Vender</Option>
                <Option value="comprar">Comprar</Option>
              </Combo>
            )}
            <Label>Usuário</Label>
            <Input
              width="70%"
              type="text"
              list="usuarios"
              onChange={handleChange("usuario")}
            />
            <datalist id="usuarios" hidden>
              {listaUsuarios.map((element) => {
                return (
                  <option key={element._id} value={element.email}>
                    {element.nome}
                  </option>
                );
              })}
            </datalist>
            <Label>Moeda</Label>
            {valoresQuery.moeda ? (
              listaMoedas.map((element) => {
                if (
                  element.nome === valoresQuery.moeda &&
                  !valoresQuery.renderizado
                ) {
                  setValues({
                    ...values,
                    moeda: element,
                    operacao: "comprar",
                  });
                  setValoresQuery({ ...valoresQuery, renderizado: true });
                }
                return element.nome === valoresQuery.moeda ? (
                  <Texto>{values.moeda.nome}</Texto>
                ) : null;
              })
            ) : (
              <Combo width="75%" onChange={handleChange("moeda")}>
                <Option value="Selecione uma moeda" selected hidden disabled>
                  Selecione uma moeda
                </Option>
                {listaMoedas.map((element) => {
                  console.log("element moeda lista", element);
                  return (
                    <Option key={element._id} value={JSON.stringify(element)}>
                      {element.nome}
                    </Option>
                  );
                })}
              </Combo>
            )}
            <Label>Quantidade</Label>
            <Input
              type="number"
              width="70%"
              onChange={handleChange("quantidade")}
              step=".000000000000000001"
            />
            <Label>Valor</Label>
            <Texto>
              R$:{" "}
              {values.moeda && values.quantidade
                ? (values.moeda.valor * values.quantidade).toLocaleString(
                    "pt-BR"
                  )
                : 0}
            </Texto>
            <Botao style={{ margin: 8 }} onClick={() => comprar(values)}>
              Concluir
            </Botao>
          </FormCard>
        </FormContainer>
        <FormContainer>
          <FormCard>
            <Titulo>Histórico</Titulo>
            <Botao
              fontSize="24px"
              fontStyle="italic"
              onClick={() => router.push("/trade/historico/comprar")}
            >
              Compras
            </Botao>
            <Botao
              fontSize="24px"
              fontStyle="italic"
              onClick={() => router.push("/trade/historico/vender")}
            >
              Vendas
            </Botao>
            <Botao
              fontSize="24px"
              fontStyle="italic"
              onClick={() => router.push("/trade/historico/geral")}
            >
              Geral
            </Botao>
          </FormCard>
        </FormContainer>
      </FormWrapper>
    </>
  );
};

export default Trade;
