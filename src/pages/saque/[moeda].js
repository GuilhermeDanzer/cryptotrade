import React, { useContext, useState, useEffect } from "react";
import { PagesTitle } from "../../components/PagesTitle";
import { Botao } from "../../components/Button";
import { Input, Label, Texto } from "../../components/Input";
import {
  FormCard,
  FormContainer,
  FormWrapper,
  Titulo,
} from "../../components/FormCard";
import { Context as userContext } from "../../context/userContext";
import { Context as saqueContext } from "../../context/saqueContext";
import { useRouter } from "next/router";
import styled from "styled-components";

const Saque = () => {
  const [value, setValues] = useState({ saques: [], bloqueado: true });
  const { state } = useContext(userContext);
  const { sacar } = useContext(saqueContext);
  const router = useRouter();
  const { usuario } = state;

  const { moeda } = router.query;

  var i;
  value.saques.reverse();

  /*  for (i = 0; i < value.saques.length; i++) {
    if (value.saques[i].moedaNome === moeda) {
      var d1 = value.saques[i].dataSaque;
      var d2 = Date.now();
      var diff = d2 - d1;
      const minutos = Math.floor(diff / 60e3);
      if (minutos <= 1440) {
        setValues({ ...value, bloqueado: true });
        break;
      } else {
        setValues({ ...value, bloqueado: false });
      }
    }
  }
*/
  useEffect(() => {
    if (usuario !== undefined) {
      setValues({ saques: usuario.saques });
    }
  }, []);
  return (
    <div>
      <PagesTitle>Saque</PagesTitle>
      <FormWrapper>
        <FormContainer>
          <FormCard>
            <Label>Moeda</Label>
            <Texto>{moeda}</Texto>
            <Label>Moedas para saque</Label>

            {usuario !== undefined
              ? usuario.moedas.map((element) => {
                  return (
                    <Texto>
                      {element.nome === moeda ? element.saque : null}
                    </Texto>
                  );
                })
              : null}
            <Label>Moedas pós taxa</Label>

            {usuario !== undefined
              ? usuario.moedas.map((element) => {
                  const posTaxa = element.saque - element.saque * usuario.taxa;

                  return (
                    <>
                      <Texto>{element.nome === moeda ? posTaxa : null}</Texto>
                      {element.nome === moeda && element.saque > 0 ? (
                        <Botao
                          onClick={() =>
                            sacar({
                              moedaNome: moeda,
                              valorSaque: element.saque,
                            })
                          }
                        >
                          Saque
                        </Botao>
                      ) : (
                        <Texto style={{ marginTop: 10 }}>
                          {element.nome === moeda ? "Saque Indisponível" : null}
                        </Texto>
                      )}
                    </>
                  );
                })
              : null}
          </FormCard>
        </FormContainer>
      </FormWrapper>
    </div>
  );
};

export default Saque;
