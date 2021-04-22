import React, { useContext, useEffect, useState } from "react";
import {
  FormCard,
  FormContainer,
  FormWrapper,
  Titulo,
} from "../../components/FormCard";
import { Input, Label, Texto } from "../../components/Input";
import { Botao } from "../../components/Button";
import { PagesTitle } from "../../components/PagesTitle";
import { useRouter } from "next/router";

import { Context as userContext } from "../../context/userContext";
import { Context as purchaseContext } from "../../context/purchaseContext";
import { Context as coinContext } from "../../context/coinsContext";
const Alugar = () => {
  const router = useRouter();
  const { moeda } = router.query;
  const { state, getOneCoin } = useContext(coinContext);
  const { fazerCompra } = useContext(purchaseContext);
  const [value, setValues] = useState({ valor: 0 });

  const handleChange = (prop) => (event) => {
    setValues({ ...value, [prop]: event.target.value });
  };

  const alugar = () => {
    fazerCompra({
      quantidade: value.quantidade,
      valor: value.quantidade * state.moeda.valor,
      moeda: { nome: moeda },
      operacao: "comprar",
      usuario: "adm@hotmail.com",
    });
  };

  useEffect(() => {
    if (router.asPath !== router.route) {
      getOneCoin(moeda);
    }
  }, [router]);

  console.log(value);
  return (
    <div>
      <PagesTitle>Aluguel</PagesTitle>
      <FormWrapper>
        <FormContainer>
          <FormCard>
            <Titulo>Alugar</Titulo>
            <Label>Moeda</Label>
            <Texto>{moeda}</Texto>
            <Label>Quantidade</Label>
            <Input
              width="70%"
              type="number"
              step=".000000000000000001"
              onChange={handleChange("quantidade")}
            ></Input>
            <Label>Valor</Label>
            <Texto>
              R${" "}
              {state.moeda && value.quantidade
                ? (value.quantidade * state.moeda.valor).toLocaleString("pt-BR")
                : 0}
            </Texto>
            <Botao style={{ margin: 8 }} onClick={() => alugar()}>
              Concluir
            </Botao>
          </FormCard>
        </FormContainer>
      </FormWrapper>
    </div>
  );
};

export default Alugar;
