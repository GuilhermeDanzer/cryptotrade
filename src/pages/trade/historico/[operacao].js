import React, { useState, useEffect, useContext } from "react";
import { Context as purchaseContext } from "../../../context/purchaseContext";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Botao } from "../../../components/Button";
import Cookies from "js-cookie";
import { Modal } from "../../../components/Modal";
import { Table } from "../../../components/Table";

const Wrapper = styled.div`
  overflow-x: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`;
const Titulo = styled.h1`
  color: ${(props) => props.theme.colors.text};
`;
const Operacoes = () => {
  const [modal, setModal] = useState(false);
  const [elementoLinha, setElementoLinha] = useState("");
  const {
    realizarOperacao,
    alugarConfirma,
    getOperacoes,
    state,
    recusarOperacao,
  } = useContext(purchaseContext);
  const router = useRouter();
  const { operacao } = router.query;
  useEffect(() => {
    if (router.asPath !== router.route) {
      getOperacoes(operacao);
    }
  }, [router]);

  const email = Cookies.get("email");

  const pagar = (pagamento) => {
    console.log(pagamento);
    setModal(!modal);
    if (email === "adm@hotmail.com") {
      alugarConfirma(pagamento);
    } else {
      realizarOperacao(pagamento);
    }
  };

  const recusar = (pagamento) => {
    setModal(!modal);
    recusarOperacao(pagamento);
  };

  const abrirModal = (elemento) => {
    console.log("elemento", elemento);
    setElementoLinha(elemento);
    setModal(!modal);
  };
  return (
    <Wrapper>
      <Titulo>Histórico</Titulo>
      <Botao
        border={true}
        style={{
          alignSelf: "flex-start",
          marginLeft: 10,
          fontSize: 18,
          fontStyle: "normal",
          color: "#000",
          border: "none",
        }}
        onClick={() => router.back()}
      >
        Voltar
      </Botao>

      <Table
        dados={state.historico}
        textoBotao="Confirmar ação"
        funcao={abrirModal}
      />
      <Modal
        isOpen={modal}
        mensagem="
      Uma vez aprovada ou recusada a ação não poderá ser desfeita,
      caso não tenha certeza cheque outra vez
      "
      >
        <Botao border={true} onClick={() => pagar(elementoLinha)}>
          Aprovar
        </Botao>

        <Botao border={true} onClick={() => recusar(elementoLinha)}>
          Recusar
        </Botao>

        <Botao border={true} onClick={() => setModal(!modal)}>
          Fechar
        </Botao>
      </Modal>
    </Wrapper>
  );
};

export default Operacoes;
