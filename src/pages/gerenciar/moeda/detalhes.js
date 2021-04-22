import React, { useContext, useEffect, useState } from "react";
import { Botao } from "../../../components/Button";
import { Label, Texto, Input } from "../../../components/Input";
import {
  FormWrapper,
  FormContainer,
  FormCard,
  Titulo,
} from "../../../components/FormCard";
import { Context as coinsContext } from "../../../context/coinsContext";
import { useRouter } from "next/router";
const Detalhes = () => {
  const router = useRouter();
  const { state, mudarRendimento, mudarValor, deletarMoeda } = useContext(
    coinsContext
  );
  const [values, setValues] = useState();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: parseFloat(event.target.value) });
  };

  const AlterarRendimento = ({ rendimento, sigla }) => {
    rendimento = rendimento / 100;
    console.log(sigla, rendimento);
    mudarRendimento({ rendimento, sigla });
    setValues({ ...values, rendimento: 0 });
  };
  const AlterarValor = ({ valor, sigla }) => {
    mudarValor({ valor, sigla });
    setValues({ ...values, valor: 0 });
  };
  console.log(values);
  return (
    <div>
      <Botao onClick={() => router.back()} black={true}>
        Voltar
      </Botao>
      <FormWrapper>
        <FormContainer>
          <FormCard>
            <Titulo>Mudar Rendimento</Titulo>
            <Label>Rendimento</Label>
            <Input
              type="number"
              step=".01"
              onChange={handleChange("rendimento")}
            ></Input>
            <Botao
              onClick={() =>
                AlterarRendimento({
                  rendimento: values.rendimento,
                  sigla: state.moeda.sigla,
                })
              }
            >
              Confirmar
            </Botao>
          </FormCard>
          <FormCard>
            <Titulo>Mudar Valor</Titulo>
            <Label>Valor</Label>
            <Input
              type="number"
              step="1"
              onChange={handleChange("valor")}
            ></Input>
            <Botao
              onClick={() =>
                AlterarValor({
                  valor: values.valor,
                  sigla: state.moeda.sigla,
                })
              }
            >
              Confirmar
            </Botao>
          </FormCard>
        </FormContainer>
        <FormCard>
          <Titulo>Excluir moeda</Titulo>
          <Label>
            Ao excluir uma moeda, ela ela será excluida da conta de todos os
            usuarios também, logo ela não poderá mais ser comercializada caso
            não seja cadastrada novamente
          </Label>

          <Botao
            onClick={() =>
              deletarMoeda({
                sigla: state.moeda.sigla,
              })
            }
          >
            Confirmar
          </Botao>
        </FormCard>
      </FormWrapper>
    </div>
  );
};

export default Detalhes;
