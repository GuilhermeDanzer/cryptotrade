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
  const { state, mudarLimite, mudarValor, cadastrarMoeda } = useContext(
    coinsContext
  );
  const [values, setValues] = useState();
  const [limite, setLimite] = useState(0);
  const handleChange = (prop) => (event) => {
    if (prop === "limite") {
      setLimite(parseFloat(event.target.value));
      console.log(limite);
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const AlterarValor = ({ valor, sigla }) => {
    mudarValor({ valor, sigla });
    setValues({ ...values, valor: 0 });
  };
  console.log(limite);
  return (
    <div>
      <Botao onClick={() => router.back()} black={true}>
        Voltar
      </Botao>
      <FormWrapper>
        <FormContainer>
          <FormCard>
            <Titulo>Mudar Rendimento Maximo</Titulo>
            <Label>Rendimento Maximo</Label>
            <Input
              type="number"
              step=".01"
              onChange={handleChange("limite")}
            ></Input>
            <Botao
              onClick={() =>
                mudarLimite({
                  limite: limite,
                })
              }
            >
              Confirmar
            </Botao>
          </FormCard>
          <FormCard>
            <Titulo>Cadastrar Moeda</Titulo>
            <Label>Nome</Label>
            <Input onChange={handleChange("nome")}></Input>
            <Label>Sigla</Label>
            <Input onChange={handleChange("sigla")}></Input>
            <Label>Valor</Label>
            <Input onChange={handleChange("valor")}></Input>
            <Botao
              onClick={() =>
                cadastrarMoeda({
                  nome: values.nome,
                  valor: values.valor,
                  sigla: values.sigla,
                })
              }
            >
              Confirmar
            </Botao>
          </FormCard>
        </FormContainer>
      </FormWrapper>
    </div>
  );
};

export default Detalhes;
