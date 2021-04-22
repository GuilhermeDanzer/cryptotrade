import React, { useState, useEffect, useContext } from "react";
import { Context as userContext } from "../../../context/userContext";
import { Context as purchaseContext } from "../../../context/purchaseContext";
import {
  Table,
  TableData,
  TableBody,
  TableHead,
  TableRow,
} from "../../../components/Table";
import {
  FormWrapper,
  FormContainer,
  FormCard,
  Titulo,
} from "../../../components/FormCard";
import { Texto, Combo, Option, Label } from "../../../components/Input";
import { Botao } from "../../../components/Button";
import { useRouter } from "next/router";
import moment from "moment";
import styled from "styled-components";
const Div = styled.div`
  padding: 25px;
`;
const Detalhes = () => {
  const { state: stateUser, definirAuth } = useContext(userContext);
  const [values, setValues] = useState();
  const router = useRouter();
  console.log(stateUser);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <Div>
      <Botao onClick={() => router.back()} black={true}>
        Voltar
      </Botao>
      <Texto>Nome: {stateUser.userDetail.nome}</Texto>
      <Texto>Email: {stateUser.userDetail.email}</Texto>
      <Texto>CPF: {stateUser.userDetail.cpf}</Texto>
      <Texto>RG: {stateUser.userDetail.rg}</Texto>
      <Texto>Hash: {stateUser.userDetail.hash}</Texto>
      <FormWrapper>
        <FormContainer>
          <FormCard>
            <Titulo>Mudar autoridade do usuario</Titulo>
            <Label>Autoridade</Label>
            <Combo width="75%" onChange={handleChange("authLevel")}>
              <Option value="none" selected disabled hidden>
                Selecione uma opção
              </Option>

              <Option value={1}>Usuario</Option>
              <Option value={2}>Admin</Option>
            </Combo>
            <Botao
              onClick={() =>
                definirAuth({
                  authLevel: values.authLevel,
                  usuarioId: stateUser.userDetail._id,
                })
              }
            >
              Confirmar
            </Botao>
          </FormCard>
        </FormContainer>
      </FormWrapper>
      <h1>Referenciados</h1>
      <TableBody>
        <TableRow isOdd={Boolean(1 % 2)}>
          <TableHead>Nome</TableHead>
          <TableHead>Nivel</TableHead>
        </TableRow>
        {stateUser.userReferenciados
          ? stateUser.userReferenciados.map((element) => {
              return (
                <TableRow>
                  <TableData>{element.nome}</TableData>
                  <TableData>{element.order}</TableData>
                </TableRow>
              );
            })
          : null}
      </TableBody>

      <h1>Moedas</h1>
      <TableBody>
        <TableRow isOdd={Boolean(1 % 2)}>
          <TableHead>Moeda</TableHead>
          <TableHead>Saldo</TableHead>
          <TableHead>Saque Disponivel</TableHead>
          <TableHead>Qntd. Moeda Ativa</TableHead>
          <TableHead>Rendimento</TableHead>
        </TableRow>
        {stateUser.userDetail.moedas
          ? stateUser.userDetail.moedas.map((element) => {
              return (
                <TableRow>
                  <TableData>{element.nome}</TableData>
                  <TableData>{element.saldo}</TableData>
                  <TableData>{element.saque}</TableData>
                  <TableData>{element.saqueAtivo}</TableData>
                  <TableData>{element.aluguel}</TableData>
                </TableRow>
              );
            })
          : null}
      </TableBody>

      <h1>Saques</h1>
      <TableBody>
        <TableRow isOdd={Boolean(1 % 2)}>
          <TableHead>Data Saque</TableHead>
          <TableHead>Moeda</TableHead>
          <TableHead>Valor do Saque</TableHead>
          <TableHead>Valor da Taxa</TableHead>
          <TableHead>Valor Pós Taxa</TableHead>
        </TableRow>
        {stateUser.userDetail.saques
          ? stateUser.userDetail.saques.map((elemento) => {
              return (
                <TableRow>
                  <TableData>
                    {moment(elemento.dataSaque).format(`DD/MM/YYYY - HH:mm:ss`)}
                  </TableData>
                  <TableData>{elemento.moedaNome}</TableData>
                  <TableData>{elemento.valorSaque}</TableData>
                  <TableData>{elemento.valorTaxa}</TableData>
                  <TableData>{elemento.valorSacado}</TableData>
                </TableRow>
              );
            })
          : null}
      </TableBody>

      <h1>Transações</h1>
      <Table admin={true} dados={stateUser.userDetail.compras} />
    </Div>
  );
};

export default Detalhes;
